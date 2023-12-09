import { Book } from "@prisma/client";
import sharp from "sharp";

import { env } from "@/env";
import { putS3Object } from "@/utils/put-s3-object";
import { setRedis } from "@/lib/redis";

import { BooksRepository } from "@/repositories/books-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface UpdateBookUseCaseRequest {
    id: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishDate?: Date | string;
    language?: string;
    pageCount?: number;
    description?: string;
    imageLink?: string;
}

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

export class UpdateBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({
        id,
        subtitle,
        authors,
        publisher,
        publishDate,
        language,
        pageCount,
        description,
        imageLink,
    }: UpdateBookUseCaseRequest): Promise<BookWithImageUrl> {
        const book = await this.booksRepository.findById(id);

        if (!book) {
            throw new ResourceNotFoundError();
        }

        if (imageLink) {
            const response = await fetch(imageLink);
            const imageBuffer: ArrayBuffer = await response.arrayBuffer();

            const sharpedBuffer = await sharp(imageBuffer)
                .resize(312, null)
                .jpeg({ quality: 80 })
                .toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: `book-${id}`,
                Body: sharpedBuffer,
                ContentType: "image/jpeg",
            });
        }

        const updatedBook = await this.booksRepository.update({
            id,
            subtitle,
            authors,
            publisher,
            publish_date: publishDate,
            language,
            page_count: pageCount,
            description,
            image_key: imageLink ? `book-${id}` : undefined,
        });

        const imageUrl = imageLink ? getSignedUrlUtil({ key: `book-${id}` }) : undefined;

        await setRedis(id, { ...book, imageUrl });

        return {
            ...updatedBook,
            imageUrl,
        };
    }
}
