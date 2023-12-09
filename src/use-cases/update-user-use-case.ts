import { User } from "@prisma/client";
import sharp from "sharp";

import { env } from "@/env";
import { invalidateCloudFrontCache } from "@/utils/invalidate-cloudfront-cache";
import { putS3Object } from "@/utils/put-s3-object";

import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { UserAlreadyExistsError } from "./_errors/user-already-exists-error";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    username: string;
    email: string;
    imageBuffer?: Buffer;
    description?: string;
    location?: string;
    website?: string;
    twitter?: string;
}

interface UserWithImageUrl extends User {
    imageUrl?: string;
}

interface UpdateUserUseCaseResponse {
    user: UserWithImageUrl;
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        id,
        name,
        username,
        email,
        imageBuffer,
        description,
        location,
        website,
        twitter,
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const existentUser = await this.usersRepository.findById(id);
        if (!existentUser) {
            throw new ResourceNotFoundError();
        }

        const existentUserWithUsername = await this.usersRepository.findByUsername(username);
        if (existentUserWithUsername && existentUserWithUsername.id !== id) {
            throw new UserAlreadyExistsError();
        }

        // letters, numbers, dot and underscore
        const validUsernameCharactersRgx = /^[a-zA-Z0-9._]+$/;
        if (!validUsernameCharactersRgx.test(username)) {
            throw new Error("Invalid username characters.");
        }

        if (imageBuffer) {
            if (existentUser.image_key) {
                await invalidateCloudFrontCache({ key: existentUser.image_key });
            }

            const updatedBuffer = await sharp(imageBuffer)
                .resize(160, 160)
                .jpeg({ quality: 80 })
                .toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: `user-${id}`,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            });
        }

        const user: UserWithImageUrl = await this.usersRepository.update({
            id,
            name,
            username,
            email,
            image_key: imageBuffer ? `user-${id}` : undefined,
            description,
            location,
            website,
            twitter,
        });

        if (imageBuffer) {
            // wait 1.5s to get the new cached image
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    if (user.image_key) {
                        user.imageUrl = getSignedUrlUtil({ key: user.image_key });
                    }
                    resolve();
                }, 1500),
            );
        } else {
            if (user.image_key) {
                user.imageUrl = getSignedUrlUtil({ key: user.image_key });
            }
        }

        return {
            user,
        };
    }
}
