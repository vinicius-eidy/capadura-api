import axios from "axios";
import dayjs from "dayjs";
import { Book } from "@prisma/client";

import { env } from "@/env";
import { putS3Object } from "@/utils/put-s3-object";
import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { BooksRepository } from "@/repositories/books-repository";

export interface BookDataFromGoogle {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
        title: string;
        subtitle: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        industryIdentifiers: {
            type: string;
            identifier: string;
        }[];
        pageCount: number;
        categories: string[];
        averageRating?: number;
        ratingsCount?: number;
        maturityRating: string;
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
            small?: string;
            medium?: string;
            large?: string;
            extraLarge?: string;
        };
        language: string;
    };
    searchInfo: {
        textSnippet: string;
    };
}

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

interface CreateBookUseCaseRequest {
    bookId: string;
}

export class CreateBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({ bookId }: CreateBookUseCaseRequest): Promise<BookWithImageUrl> {
        const book = await this.booksRepository.findById(bookId);

        if (book) {
            let imageUrl;
            if (book.image_key) {
                imageUrl = getSignedUrlUtil({ key: book.image_key });
            }

            return {
                ...book,
                imageUrl,
            };
        }

        const { data } = await axios.get<BookDataFromGoogle>(
            `https://www.googleapis.com/books/v1/volumes/${bookId}`,
        );

        const {
            title,
            subtitle,
            authors,
            publisher,
            publishedDate,
            language,
            pageCount,
            description,
            imageLinks,
        } = data.volumeInfo;

        const parsedPulishedDate = dayjs(publishedDate, { format: "YYYY-MM-DD" });
        const dbPublishedDate = parsedPulishedDate.isValid()
            ? parsedPulishedDate.toISOString()
            : null;

        const imageLink = imageLinks?.medium?.replace("&edge=curl", "");

        // save image book on AWS S3
        if (imageLink) {
            const response = await fetch(imageLink);
            const imageBuffer: ArrayBuffer = await response.arrayBuffer();
            const imageContentType = response.headers.get("Content-Type") || undefined;

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: `book-${bookId}`,
                Body: Buffer.from(imageBuffer),
                ContentType: imageContentType,
            });
        }

        const createdBook = await this.booksRepository.create({
            id: bookId,
            title,
            subtitle,
            authors,
            publisher,
            publish_date: dbPublishedDate,
            language,
            page_count: pageCount,
            description,
            image_key: imageLink ? `book-${bookId}` : undefined,
        });

        const imageUrl = imageLink ? getSignedUrlUtil({ key: `book-${bookId}` }) : undefined;

        return {
            ...createdBook,
            imageUrl,
        };
    }
}
