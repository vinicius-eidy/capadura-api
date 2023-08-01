import { randomUUID } from "node:crypto";
import { Prisma, BookList, Book } from "@prisma/client";
import { BookListsRepository, updateBookList } from "../booklist-repository";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";

export class InMemoryBookListsRepository implements BookListsRepository {
    public items: (BookList & {
        books: Book[];
    })[] = [];

    async findManyByUserId(userId: string, q: string) {
        const bookLists = this.items.filter((item) => {
            if (q) {
                return item.user_id === userId && item.name.includes(q);
            }

            return item.user_id === userId;
        });

        return bookLists;
    }

    async delete(bookListId: string) {
        this.items = this.items.filter((item) => item.id !== bookListId);

        return;
    }

    async update({ bookListId, name, description, bookId }: updateBookList) {
        const itemToUpdate = this.items.find((item) => item.id === bookListId);

        if (!itemToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (name) {
            itemToUpdate.name = name;
        }

        if (description) {
            itemToUpdate.description = description;
        }

        itemToUpdate.books = itemToUpdate.books.filter((book) => book.id !== bookId);

        return itemToUpdate;
    }

    async create(data: Prisma.BookListUncheckedCreateInput) {
        const bookList = {
            id: data.id || randomUUID(),
            name: data.name,
            description: data.description || null,
            user_id: data.user_id,
            books: [],
        };

        this.items.push(bookList);

        return bookList;
    }
}
