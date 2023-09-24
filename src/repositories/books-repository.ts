import { Book, Prisma } from "@prisma/client";

export interface FindManyBooksInput {
    page: number;
    perPage: number;
}

export interface BooksRepository {
    findById(bookId: string): Promise<Book | null>;
    findMany({ page, perPage }: FindManyBooksInput): Promise<Book[]>;
    update(data: Prisma.BookUpdateInput): Promise<Book>;
    create(data: Prisma.BookUncheckedCreateInput): Promise<Book>;
}
