import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import {
    BooksOnBookListsRepository,
    BooksOnBookListsWithBookList,
} from "../books-on-book-lists-repository";

export class InMemoryBooksOnBookListsRepository implements BooksOnBookListsRepository {
    public items: BooksOnBookListsWithBookList[] = [];

    async findUnique(bookOnBookListId: string) {
        return this.items.find((item) => item.id === bookOnBookListId) || null;
    }

    async delete(bookOnBookListId: string) {
        this.items = this.items.filter((item) => item.id !== bookOnBookListId);

        return;
    }

    async create(data: Prisma.BooksOnBookListsUncheckedCreateInput) {
        const { id, book_id, book_list_id } = data;
        const bookOnBookList = {
            id: id || randomUUID(),
            book_id,
            book_list_id,
        };

        this.items.push({ ...bookOnBookList, book_list: undefined });

        return bookOnBookList;
    }
}
