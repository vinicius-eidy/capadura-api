import { User } from "@prisma/client";
import { S3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

import { env } from "@/env";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    username: string;
    email: string;
    imageBuffer?: Buffer;
    description?: string;
    favoriteBooks?: string[];
    location?: string;
    website?: string;
    twitter?: string;
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
        favoriteBooks,
        location,
        website,
        twitter,
    }: UpdateUserUseCaseRequest): Promise<User> {
        const existentUser = await this.usersRepository.findById(id);
        if (!existentUser) {
            throw new ResourceNotFoundError();
        }

        if (imageBuffer) {
            const updatedBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();

            const params = {
                Bucket: env.S3_BUCKET_NAME,
                Key: `user-${id}`,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            };
            const command = new PutObjectCommand(params);
            await S3.send(command);
        }

        const user = await this.usersRepository.update({
            id,
            name,
            username,
            email,
            image_key: imageBuffer ? `user-${id}` : null,
            description,
            favorite_books: favoriteBooks,
            location,
            website,
            twitter,
        });

        return user;
    }
}
