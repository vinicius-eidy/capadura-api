import { randomBytes, randomUUID } from "node:crypto";
import { User } from "@prisma/client";
import sharp from "sharp";

import { env } from "@/env";
import { UsersRepository } from "@/repositories/users-repository";

import { GoogleOAuthUserResponse, getGoogleOAuthUser } from "@/utils/get-google-oauth-user";
import { getGoogleOAuthTokens } from "@/utils/get-google-oauth-tokens";
import { putS3Object } from "@/utils/put-s3-object";

interface HandleGoogleOAuthSessionUseCaseRequest {
    code: string;
}

interface HandleGoogleOAuthSessionUseCaseResponse {
    user: User;
}

export class HandleGoogleOAuthSessionUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        code,
    }: HandleGoogleOAuthSessionUseCaseRequest): Promise<HandleGoogleOAuthSessionUseCaseResponse> {
        const { id_token, access_token } = await getGoogleOAuthTokens(code);

        const googleUser: GoogleOAuthUserResponse = await getGoogleOAuthUser({
            id_token,
            access_token,
        });

        const userWithSameEmail = await this.usersRepository.findByEmail(googleUser.email);

        if (userWithSameEmail) {
            return {
                user: userWithSameEmail,
            };
        }

        const { name, email, picture } = googleUser;

        const createUserId = randomUUID();

        if (picture) {
            const response = await fetch(picture);
            const imageBuffer: ArrayBuffer = await response.arrayBuffer();

            const updatedBuffer = await sharp(imageBuffer)
                .resize(160, 160)
                .jpeg({ quality: 80 })
                .toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: `user-${createUserId}`,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            });
        }

        const baseRandomUsername = name.toLowerCase().replaceAll(" ", "-").slice(0, 16);
        let usernameNotExists = false;
        let finalUsername = "";
        do {
            // generate 8 random hexadecimal digits
            const buffer = randomBytes(4);
            const randomHex = buffer.toString("hex");

            const randomUsername = `${baseRandomUsername}-${randomHex}`;
            const userWithSameUsername = await this.usersRepository.findByUsername(randomUsername);
            if (!userWithSameUsername) {
                usernameNotExists = true;
                finalUsername = randomUsername;
            }
        } while (!usernameNotExists);

        const createdUser = await this.usersRepository.create({
            id: createUserId,
            name,
            username: finalUsername,
            email,
            password_hash: "gauth",
            image_key: picture ? `user-${createUserId}` : undefined,
        });

        return {
            user: createdUser,
        };
    }
}
