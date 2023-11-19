import { BookList } from "@prisma/client";
import sharp from "sharp";

import { env } from "@/env";
import { putS3Object } from "@/utils/put-s3-object";
import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { invalidateCloudFrontCache } from "@/utils/invalidate-cloudfront-cache";

import { BookListsRepository } from "@/repositories/book-lists-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface UpdateBookListUseCaseRequest {
    bookListId: string;
    name?: string;
    description?: string;
    imageBuffer?: Buffer;
    userId: string;
}

interface BookListWithImageUrl extends BookList {
    imageUrl?: string;
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
            if (bookListToUpdate.image_key) {
                await invalidateCloudFrontCache({ key: bookListToUpdate.image_key });
            }

            // upload new image in S3
            const updatedBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: `booklist-${bookListId}`,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            });
        }

        const bookList: BookListWithImageUrl = await this.booksListsRepository.update({
            id: bookListId,
            name,
            description,
            image_key: imageBuffer ? `booklist-${bookListId}` : undefined,
        });

        if (imageBuffer) {
            // wait 1.5s to get the new cached image
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    if (bookList.image_key) {
                        bookList.imageUrl = getSignedUrlUtil({ key: bookList.image_key });
                    }
                    resolve();
                }, 1500),
            );
        } else {
            if (bookList.image_key) {
                bookList.imageUrl = getSignedUrlUtil({ key: bookList.image_key });
            }
        }

        return bookList;
    }
}
