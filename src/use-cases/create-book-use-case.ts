import { Book } from "@prisma/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { env } from "@/env";
import { BooksRepository } from "@/repositories/books-repository";
import { S3 } from "@/lib/s3";

interface CreateBookUseCaseRequest {
    id: string;
    title: string;
    subtitle?: string;
    authors: string[];
    publisher?: string;
    publishDate?: Date | string;
    language?: string;
    pageCount?: number;
    description?: string;
    imageLink?: string;
}

interface CreateBookUseCaseResponse {
    book: Book;
}

export class CreateBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({
        id,
        title,
        subtitle,
        authors,
        publisher,
        publishDate,
        language,
        pageCount,
        description,
        imageLink,
    }: CreateBookUseCaseRequest): Promise<CreateBookUseCaseResponse> {
        const book = await this.booksRepository.findById(id);

        if (book) {
            return {
                book,
            };
        }

        // save image book on AWS S3
        if (imageLink) {
            const response = await fetch(imageLink);
            const imageBuffer: ArrayBuffer = await response.arrayBuffer();
            const imageContentType = response.headers.get("Content-Type") || undefined;

            const params = {
                Bucket: env.S3_BUCKET_NAME,
                Key: `book-${id}`,
                Body: Buffer.from(imageBuffer),
                ContentType: imageContentType,
            };
            const command = new PutObjectCommand(params);
            await S3.send(command);
        }

        const createdBook = await this.booksRepository.create({
            id,
            title,
            subtitle,
            authors,
            publisher,
            publish_date: publishDate,
            language,
            page_count: pageCount,
            description,
            image_key: imageLink ? `book-${id}` : null,
        });

        return {
            book: createdBook,
        };
    }
}
