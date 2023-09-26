import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BooksRepository, FindManyBookIdsInput } from "../books-repository";

export class PrismaBooksRepository implements BooksRepository {
    async findById(bookId: string) {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });

        return book ?? null;
    }

    async findManyIds({ page, perPage }: FindManyBookIdsInput) {
        const books = await prisma.book.findMany({
            select: {
                id: true,
            },
            orderBy: {
                id: "asc",
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });

        return books;
    }

    async update(data: Prisma.BookUpdateInput) {
        const { id, ...updateData } = data;

        const book = await prisma.book.update({
            where: {
                id: id as string,
            },
            data: updateData,
        });

        return book;
    }

    async create(data: Prisma.BookCreateInput) {
        const book = await prisma.book.create({
            data,
        });

        return book;
    }
}
