import { BookList, BooksOnBookLists, Prisma } from "@prisma/client";

export type BooksOnBookListsWithBookList = BooksOnBookLists & {
    book_list?: BookList;
};

export interface BooksOnBookListsRepository {
    findUnique(bookOnBookListId: string): Promise<BooksOnBookListsWithBookList | null>;
    delete(bookOnBookListId: string): Promise<void>;
    create(data: Prisma.BooksOnBookListsUncheckedCreateInput): Promise<BooksOnBookLists>;
}
