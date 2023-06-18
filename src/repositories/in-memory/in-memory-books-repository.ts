import { randomUUID } from "node:crypto";
import { Book, Prisma } from "@prisma/client";

import { BooksRepository } from "../books-repository";

type BookCreateInput = Omit<Prisma.BookCreateInput, "bookListId"> & {
    bookListId?: string | null;
};

export class InMemoryBooksRepository implements BooksRepository {
    public items: Book[] = [];

    async findById(bookId: string) {
        const book = this.items.find((item) => item.id === bookId);

        return book ?? null;
    }

    async create(data: BookCreateInput) {
        const {
            id = randomUUID(),
            title,
            subtitle = null,
            authors = [],
            publisher = null,
            publishDate = null,
            language = null,
            pageCount = null,
            description = null,
            bookListId = null,
        } = data;

        const book: Book = {
            id,
            title,
            subtitle,
            authors: Array.isArray(authors) ? authors : [authors as string],
            publisher,
            publishDate: publishDate ? new Date(publishDate) : null,
            language,
            pageCount,
            description,
            bookListId,
        };

        this.items.push(book);

        return book;
    }
}
