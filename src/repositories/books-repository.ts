import { Book, Prisma } from "@prisma/client";

export interface FindManyBookIdsInput {
    page: number;
    perPage: number;
}

interface FindManyBookIdsOutput {
    id: string;
}

export interface BooksRepository {
    findById(bookId: string): Promise<Book | null>;
    findManyIds({ page, perPage }: FindManyBookIdsInput): Promise<FindManyBookIdsOutput[]>;
    update(data: Prisma.BookUpdateInput): Promise<Book>;
    create(data: Prisma.BookUncheckedCreateInput): Promise<Book>;
}
