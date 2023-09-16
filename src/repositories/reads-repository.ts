import { Book, Prisma, Read } from "@prisma/client";

export interface findManyByUserIdRequest {
    userId: string;
    bookId?: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    page: number;
    perPage: number;
}

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

export interface ReadWithBook extends Read {
    book: BookWithImageUrl;
}

interface findManyByUserIdResponse {
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
    findManyByUserId(data: findManyByUserIdRequest): Promise<findManyByUserIdResponse>;
    getAllReviewRatings({
        bookId,
        userId,
    }: {
        bookId?: string;
        userId?: string;
    }): Promise<getAllReviewRatingsResponse>;
    getTotalFinishedReadsCountByBook(bookId: string): Promise<number>;
    update(data: Prisma.ReadUpdateInput): Promise<Read | undefined>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
    delete(readId: string): Promise<void>;
}
