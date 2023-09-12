import { randomUUID } from "node:crypto";
import { Book, Prisma } from "@prisma/client";
import {
    BooksOnBookListsRepository,
    BooksOnBookListsWithBookList,
    findManyByBookListData,
} from "../books-on-book-lists-repository";

export class InMemoryBooksOnBookListsRepository implements BooksOnBookListsRepository {
    public items: (BooksOnBookListsWithBookList & {
        book?: Book;
    })[] = [];

    async findUnique(bookOnBookListId: string) {
        return this.items.find((item) => item.id === bookOnBookListId) || null;
    }

    async findManyByBookList({ bookListId, page, perPage }: findManyByBookListData) {
        const booksOnBookLists = this.items
            .filter((item) => item.book_list_id === bookListId)
            .slice((page - 1) * perPage, page * perPage);

        booksOnBookLists.forEach((item) => {
            item.book === undefined;
        });

        return booksOnBookLists;
    }

    async delete(bookOnBookListId: string) {
        this.items = this.items.filter((item) => item.id !== bookOnBookListId);
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
