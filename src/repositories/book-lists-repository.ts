import { BookList, Prisma } from "@prisma/client";

export interface BookListsRepository {
    findUniqueById(bookListId: string): Promise<BookList | null>;
    findManyByUserId(userId: string, q: string, bookId?: string): Promise<BookList[]>;
    update(data: Prisma.BookListUpdateInput): Promise<BookList>;
    delete(bookListId: string): Promise<void>;
    create(data: Prisma.BookListUncheckedCreateInput): Promise<BookList>;
}
