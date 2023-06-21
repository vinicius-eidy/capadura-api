import { randomUUID } from "node:crypto";
import { Book, Prisma } from "@prisma/client";

import { BooksRepository } from "../books-repository";

export class InMemoryBooksRepository implements BooksRepository {
    public items: Book[] = [];

    async findById(bookId: string) {
        const book = this.items.find((item) => item.id === bookId);

        return book ?? null;
    }

    async create(data: Prisma.BookUncheckedCreateInput) {
        const {
            id = randomUUID(),
            title,
            subtitle = null,
            authors = [],
            publisher = null,
            publish_date = null,
            language = null,
            page_count = null,
            description = null,
            book_list_id = null,
        } = data;

        const book: Book = {
            id,
            title,
            subtitle,
            authors: Array.isArray(authors) ? authors : [authors as string],
            publisher,
            publish_date: publish_date ? new Date(publish_date) : null,
            language,
            page_count,
            description,
            book_list_id,
        };

        this.items.push(book);

        return book;
    }
}
