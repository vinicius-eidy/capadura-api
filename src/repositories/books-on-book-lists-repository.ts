import { Book, BookList, BooksOnBookLists, Prisma } from "@prisma/client";

export type BooksOnBookListsWithBookList = BooksOnBookLists & {
    book_list?: BookList;
};

export interface findManyByBookListData {
    bookListId: string;
    page: number;
    perPage: number;
}
export type BooksOnBookListsWithBook = BooksOnBookLists & {
    book?: Book;
};

export interface BooksOnBookListsRepository {
    findUnique(bookOnBookListId: string): Promise<BooksOnBookListsWithBookList | null>;
    findManyByBookList({
        bookListId,
        page,
        perPage,
    }: findManyByBookListData): Promise<BooksOnBookListsWithBook[] | null>;
    getTotalListsWithSomeBookCount(bookId: string): Promise<number>;
    delete(bookOnBookListId: string): Promise<void>;
    create(data: Prisma.BooksOnBookListsUncheckedCreateInput): Promise<BooksOnBookLists>;
}
