import { Prisma, Read } from "@prisma/client";

export interface findManyByUserIdRequest {
    userId: string;
    bookId?: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    page: number;
    perPage: number;
}

interface findManyByUserIdResponse {
    reads: Read[];
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
    findManyByUserId(data: findManyByUserIdRequest): Promise<findManyByUserIdResponse>;
    getAllReviewRatings({
        bookId,
        userId,
    }: {
        bookId?: string;
        userId?: string;
    }): Promise<getAllReviewRatingsResponse>;
    update(data: Prisma.ReadUpdateInput): Promise<Read | undefined>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
}
