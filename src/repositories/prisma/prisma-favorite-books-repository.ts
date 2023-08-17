import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FavoriteBooksRepository } from "../favorite-books-repository";

export class PrismaFavoriteBooksRepository implements FavoriteBooksRepository {
    async findUnique(favoriteBookId: string) {
        const favoriteBook = await prisma.favoriteBook.findUnique({
            where: {
                id: favoriteBookId,
            },
            include: {
                book: true,
            },
        });

        return favoriteBook || null;
    }

    async findManyByUserId(userId: string) {
        const favoriteBooks = await prisma.favoriteBook.findMany({
            where: {
                user_id: userId,
            },
            orderBy: {
                order: "asc",
            },
            include: {
                book: true,
            },
        });

        return favoriteBooks;
    }

    async update(data: Prisma.FavoriteBookUpdateInput) {
        const bookId = data.book?.connect?.id ? { id: data.book?.connect?.id } : undefined;

        const favoriteBook = await prisma.favoriteBook.update({
            where: {
                id: data.id as string,
            },
            data: {
                order: data.order,
                book: {
                    connect: bookId,
                },
            },
            include: {
                book: true,
            },
        });

        return favoriteBook;
    }

    async delete(favoriteBookId: string) {
        await prisma.favoriteBook.delete({
            where: {
                id: favoriteBookId,
            },
        });

        return;
    }

    async create(data: Prisma.FavoriteBookUncheckedCreateInput) {
        const favoriteBook = await prisma.favoriteBook.create({
            data,
        });

        return favoriteBook;
    }
}
