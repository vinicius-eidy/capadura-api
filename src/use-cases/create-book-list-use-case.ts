import { BookList } from "@prisma/client";
import sharp from "sharp";

import { env } from "@/env";
import { BookListsRepository } from "@/repositories/book-lists-repository";

import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { putS3Object } from "@/utils/put-s3-object";

interface CreateBookListUseCaseRequest {
    name: string;
    description?: string;
    imageBuffer?: Buffer;
    userId: string;
}

interface BookListWithImageUrl extends BookList {
    imageUrl?: string;
}

export class CreateBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({
        name,
        description,
        imageBuffer,
        userId,
    }: CreateBookListUseCaseRequest): Promise<BookListWithImageUrl> {
        const bookList: BookListWithImageUrl = await this.booksListsRepository.create({
            name,
            description,
            user_id: userId,
        });

        const bookListImageKey = `booklist-${bookList.id}`;

        if (imageBuffer) {
            // upload new image in S3
            const updatedBuffer = await sharp(imageBuffer)
                .resize(224, 224)
                .jpeg({ quality: 80 })
                .toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: bookListImageKey,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            });

            await this.booksListsRepository.update({
                id: bookList.id,
                image_key: bookListImageKey,
            });
        }

        if (imageBuffer) {
            bookList.imageUrl = getSignedUrlUtil({ key: bookListImageKey });
        }

        return bookList;
    }
}
