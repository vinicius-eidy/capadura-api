import { Prisma, Read } from "@prisma/client";

export interface ReadWithBook extends Read {
    book: {
        title: string;
        image_key: string | null;
        imageUrl?: string;
    };
}

export interface ReadWithUser extends Read {
    user: {
        id: string;
        name: string;
        username: string;
        description: string | null;
        image_key: string | null;
        imageUrl?: string;
    };
}

export interface ReadWithBookAndUser extends Read {
    book: {
        title: string;
        image_key: string | null;
        imageUrl?: string;
    };
    user: {
        id: string;
        name: string;
        username: string;
        description: string | null;
        image_key: string | null;
        imageUrl?: string;
    };
}

export interface findManyByUserIdInput {
    userId: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    page: number;
    perPage: number;
}

export interface FindManyByUserIdForUniqueBookInput {
    userId: string;
    bookId: string;
}

export interface findManyByBookIdInput {
    bookId: string;
    page: number;
    perPage: number;
}

export interface findManyByBookIdOutput {
    reads: ReadWithUser[];
    total: number;
}

interface FindManyByUserIdForUniqueBookOutput {
    reads: Read[];
    total: number;
}

export interface FindManyByReviewRatingsAndUserInput {
    rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    userId: string;
    page: number;
    perPage: number;
}

interface FindManyByReviewRatingsOutput {
    reads: ReadWithBook[];
    total: number;
}

export interface FindManyByReviewRatingsAndBookInput {
    rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    bookId: string;
    page: number;
    perPage: number;
}

export interface FindManyFinishedReadsInput {
    page: number;
    perPage: number;
}

interface FindManyFinishedReadsOutput {
    reads: ReadWithBookAndUser[];
    total: number;
}

interface FindManyByReviewRatingsAndBookOutput {
    reads: ReadWithBookAndUser[];
    total: number;
}

interface findManyByUserIdOutput {
    reads: ReadWithBook[];
    total: number;
}

interface getAllReviewRatingsResponse {
    data: {
        rating: number;
        amount: number;
        percentage: number;
    }[];
    total: number;
}

export interface ReadsRepository {
    findUniqueById(readId: string): Promise<Read | null>;
    findManyByUserId(data: findManyByUserIdInput): Promise<findManyByUserIdOutput>;
    findManyByBookId(data: findManyByBookIdInput): Promise<findManyByBookIdOutput>;
    findManyByUserIdForUniqueBook(
        data: FindManyByUserIdForUniqueBookInput,
    ): Promise<FindManyByUserIdForUniqueBookOutput>;
    findManyByReviewRatingsAndUser(
        data: FindManyByReviewRatingsAndUserInput,
    ): Promise<FindManyByReviewRatingsOutput>;
    findManyByReviewRatingsAndBook(
        data: FindManyByReviewRatingsAndBookInput,
    ): Promise<FindManyByReviewRatingsAndBookOutput>;
    findManyFinishedReads(data: FindManyFinishedReadsInput): Promise<FindManyFinishedReadsOutput>;
    getAllReviewRatings(data: {
        bookId?: string;
        userId?: string;
    }): Promise<getAllReviewRatingsResponse>;
    getTotalFinishedReadsCountByBook(bookId: string): Promise<number>;
    update(data: Prisma.ReadUpdateInput): Promise<Read | undefined>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
    delete(readId: string): Promise<void>;
}
