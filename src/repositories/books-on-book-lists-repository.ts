import { Book, BookList, BooksOnBookLists, Prisma } from "@prisma/client";

export type BooksOnBookListsWithBookList = BooksOnBookLists & {
    book_list?: BookList;
};

export interface fetchManyByBookListData {
    bookListId: string;
    page: number;
    perPage: number;
}
export type BooksOnBookListsWithBook = BooksOnBookLists & {
    book: Book;
};

export interface BooksOnBookListsRepository {
    findUnique(bookOnBookListId: string): Promise<BooksOnBookListsWithBookList | null>;
    fetchManyByBookList({
        bookListId,
        page,
        perPage,
    }: fetchManyByBookListData): Promise<BooksOnBookListsWithBook[] | null>;
    delete(bookOnBookListId: string): Promise<void>;
    create(data: Prisma.BooksOnBookListsUncheckedCreateInput): Promise<BooksOnBookLists>;
}
