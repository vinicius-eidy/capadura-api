import { Prisma, Read } from "@prisma/client";

export interface findManyByUserIdRequest {
    userId: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    page: number;
    perPage: number;
}

export interface FindManyByUserIdForUniqueBookInput {
    userId: string;
    bookId: string;
}

interface FindManyByUserIdForUniqueBookOutput {
    reads: Read[];
    total: number;
}

export interface ReadWithBook extends Read {
    book: {
        title: string;
        image_key: string | null;
        imageUrl?: string;
    };
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
    findManyByUserIdForUniqueBook(
        data: FindManyByUserIdForUniqueBookInput,
    ): Promise<FindManyByUserIdForUniqueBookOutput>;
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
