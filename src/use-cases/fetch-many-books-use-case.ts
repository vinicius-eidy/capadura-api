import { Book } from "@prisma/client";

import { BooksRepository } from "@/repositories/books-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

interface FetchManyBooksUseCaseRequest {
    page: number;
    perPage: number;
}

interface FetchManyBooksUseCaseResponse {
    books: BookWithImageUrl[];
}

export class FetchManyBooksUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({
        page,
        perPage,
    }: FetchManyBooksUseCaseRequest): Promise<FetchManyBooksUseCaseResponse> {
        const books: BookWithImageUrl[] = await this.booksRepository.findMany({ page, perPage });

        if (!books.length) {
            return {
                books: [],
            };
        }

        books.forEach((book) => {
            if (book.image_key) {
                book.imageUrl = getSignedUrlUtil({ key: book.image_key });
            }
        });

        return {
            books,
        };
    }
}
