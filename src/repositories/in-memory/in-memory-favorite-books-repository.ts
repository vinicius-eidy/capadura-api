import { randomUUID } from "node:crypto";
import { Prisma, Book, FavoriteBook } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { FavoriteBooksRepository } from "../favorite-books-repository";

export class InMemoryFavoriteBooksRepository implements FavoriteBooksRepository {
    public items: (FavoriteBook & {
        books?: Book[];
    })[] = [];

    async findUnique(favoriteBookId: string) {
        const favoriteBook = this.items.find((item) => item.id === favoriteBookId) || null;

        return favoriteBook;
    }

    async findManyByUserId(userId: string) {
        const favoriteBooks = this.items
            .filter((item) => item.user_id === userId)
            .sort((a, b) => a.order - b.order);

        return favoriteBooks;
    }

    async delete(favoriteBookId: string) {
        this.items = this.items.filter((item) => item.id !== favoriteBookId);

        return;
    }

    async update(data: Prisma.FavoriteBookUpdateInput) {
        const itemToUpdate = this.items.find((item) => item.id === data.id);

        if (!itemToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (data.book) {
            itemToUpdate.book_id = data.book as string;
        }

        if (data.order) {
            itemToUpdate.order = data.order as number;
        }

        return itemToUpdate;
    }

    async create(data: Prisma.FavoriteBookUncheckedCreateInput) {
        const { id, order, updated_at, book_id, user_id } = data;
        const favoriteBook = {
            id: id || randomUUID(),
            order,
            updated_at: (updated_at as Date) || new Date(),
            book_id,
            user_id,
            books: undefined,
        };

        this.items.push(favoriteBook);

        return favoriteBook;
    }
}
