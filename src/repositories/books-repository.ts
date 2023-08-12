import { Book, Prisma } from "@prisma/client";

export interface BooksRepository {
    findById(bookId: string): Promise<Book | null>;
    update(data: Prisma.BookUpdateInput): Promise<Book>;
    create(data: Prisma.BookUncheckedCreateInput): Promise<Book>;
}
