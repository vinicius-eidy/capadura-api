import { randomUUID } from "node:crypto";
import { Prisma, BookList, Book } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { BookListsRepository } from "../book-lists-repository";

export class InMemoryBookListsRepository implements BookListsRepository {
    public items: (BookList & {
        books: Book[];
    })[] = [];

    async findUniqueById(bookListId: string) {
        const bookList = this.items.find((item) => item.id === bookListId) || null;

        return bookList;
    }

    async findManyByUserId(userId: string, q: string, bookId?: string) {
        const bookLists = this.items.filter((item) => {
            if (q) {
                return item.user_id === userId && item.name.includes(q);
            }

            return item.user_id === userId;
        });

        if (!bookId) {
            const bookListsWithoutBooks = bookLists.filter((item) => {
                return { ...item, books: undefined };
            });

            return bookListsWithoutBooks;
        }

        return bookLists;
    }

    async delete(bookListId: string) {
        this.items = this.items.filter((item) => item.id !== bookListId);

        return;
    }

    async update(data: Prisma.BookListUpdateInput) {
        const itemToUpdate = this.items.find((item) => item.id === data.id);

        if (!itemToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (data.name) {
            itemToUpdate.name = data.name as string;
        }

        itemToUpdate.description = (data.description as string) || null;
        itemToUpdate.image_key = (data.image_key as string) || null;

        return itemToUpdate;
    }

    async create(data: Prisma.BookListUncheckedCreateInput) {
        const bookList = {
            id: data.id ?? randomUUID(),
            name: data.name,
            description: data.description ?? null,
            user_id: data.user_id,
            image_key: data.image_key ?? null,
            books: [],
        };

        this.items.push(bookList);

        return bookList;
    }
}
