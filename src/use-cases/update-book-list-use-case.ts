import { BookList } from "@prisma/client";
import { CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

import { env } from "@/env";
import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { cloudFront } from "@/lib/cloudfront";
import { S3 } from "@/lib/s3";

import { BookListsRepository } from "@/repositories/book-lists-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface BookListWithImageUrl extends BookList {
    imageUrl?: string;
}

interface UpdateBookListUseCaseRequest {
    bookListId: string;
    name?: string;
    description?: string;
    imageBuffer?: Buffer;
    userId: string;
}

export class UpdateBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({
        bookListId,
        name,
        description,
        imageBuffer,
        userId,
    }: UpdateBookListUseCaseRequest): Promise<BookListWithImageUrl> {
        const bookListToUpdate = await this.booksListsRepository.findUniqueById(bookListId);

        if (!bookListToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (bookListToUpdate.user_id !== userId) {
            throw new UnauthorizedError();
        }

        if (imageBuffer) {
            // invalidate the cloudfront cache for the previous image
            if (bookListToUpdate.image_key) {
                const invalidationParams = {
                    DistributionId: env.CLOUDFRONT_DISTRIBUTION_ID,
                    InvalidationBatch: {
                        CallerReference: bookListToUpdate.image_key,
                        Paths: {
                            Quantity: 1,
                            Items: ["/" + bookListToUpdate.image_key],
                        },
                    },
                };

                const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
                await cloudFront.send(invalidationCommand);
            }

            // upload new image in S3
            const updatedBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();

            const params = {
                Bucket: env.S3_BUCKET_NAME,
                Key: `booklist-${bookListId}`,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            };
            const command = new PutObjectCommand(params);
            await S3.send(command);
        }

        const bookList = await this.booksListsRepository.update({
            id: bookListId,
            name,
            description,
            image_key: imageBuffer ? `booklist-${bookListId}` : undefined,
        });

        let imageUrl;
        if (bookList.image_key) {
            imageUrl = getSignedUrlUtil({ key: bookList.image_key });
        }

        const bookListWithImageUrl = {
            ...bookList,
            imageUrl,
        };

        return bookListWithImageUrl;
    }
}
