import axios from "axios";
import { isValid } from "date-fns";
import { Book } from "@prisma/client";
import sharp from "sharp";

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
        const book: BookWithImageUrl | null = await this.booksRepository.findById(bookId);

        if (book) {
            if (book.image_key) {
                book.imageUrl = getSignedUrlUtil({ key: book.image_key });
            }

            return book;
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
            industryIdentifiers,
        } = data.volumeInfo;

        const bookISBN13 =
            industryIdentifiers?.find((item) => item.type === "ISBN_13")?.identifier ?? null;

        const parsedPulishedDate = new Date(publishedDate);
        const dbPublishedDate = isValid(parsedPulishedDate)
            ? parsedPulishedDate.toISOString()
            : null;

        const imageLink = imageLinks?.medium?.replace("&edge=curl", "");

        if (imageLink) {
            const response = await fetch(imageLink);
            const imageBuffer: ArrayBuffer = await response.arrayBuffer();

            const sharpedBuffer = await sharp(imageBuffer)
                .resize(312, null)
                .jpeg({ quality: 80 })
                .toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: `book-${bookId}`,
                Body: sharpedBuffer,
                ContentType: "image/jpeg",
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
            isbn13: bookISBN13,
        });

        const imageUrl = imageLink ? getSignedUrlUtil({ key: `book-${bookId}` }) : undefined;

        return {
            ...createdBook,
            imageUrl,
        };
    }
}
