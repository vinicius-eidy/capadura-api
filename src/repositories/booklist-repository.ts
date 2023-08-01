import { BookList, Prisma } from "@prisma/client";

export interface updateBookList {
    bookListId: string;
    name?: string;
    description?: string;
    bookId?: string;
}

export interface BookListsRepository {
    findManyByUserId(userId: string, q: string): Promise<BookList[]>;
    update({ bookListId, name, description, bookId }: updateBookList): Promise<BookList>;
    delete(bookListId: string, userId: string): Promise<void>;
    create(data: Prisma.BookListUncheckedCreateInput): Promise<BookList>;
}
