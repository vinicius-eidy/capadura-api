import { BookList, Prisma } from "@prisma/client";

export interface updateBookList {
    bookListId: string;
    name?: string;
    description?: string;
    bookId?: string;
}

export interface BookListsRepository {
    findUniqueById(bookListId: string): Promise<BookList | null>;
    findManyByUserId(userId: string, q: string): Promise<BookList[]>;
    update({ bookListId, name, description, bookId }: updateBookList): Promise<BookList>;
    delete(bookListId: string): Promise<void>;
    create(data: Prisma.BookListUncheckedCreateInput): Promise<BookList>;
}
