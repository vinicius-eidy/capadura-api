import { Prisma, Read } from "@prisma/client";

export interface findManyByBookByUserIdRequest {
    userId: string;
    bookId: string;
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
    findManyByBookByUserId({ userId, bookId }: findManyByBookByUserIdRequest): Promise<Read[]>;
    getAllReviewRatings(bookId: string): Promise<getAllReviewRatingsResponse>;
    update(data: Prisma.ReadUpdateInput): Promise<Read | undefined>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
}
