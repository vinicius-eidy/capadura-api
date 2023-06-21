import { Book, Prisma } from "@prisma/client";

export interface BooksRepository {
    findById(bookId: string): Promise<Book | null>;
    create(data: Prisma.BookUncheckedCreateInput): Promise<Book>;
}
