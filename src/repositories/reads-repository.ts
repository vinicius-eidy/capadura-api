import { Prisma, Read } from "@prisma/client";

export interface findManyByBookByUserIdRequest {
    userId: string;
    bookId: string;
    page: number;
}

interface findManyByBookByUserIdResponse {
    items: Read[];
    total: number;
}

export interface ReadsRepository {
    findManyByBookByUserId({
        userId,
        bookId,
        page,
    }: findManyByBookByUserIdRequest): Promise<findManyByBookByUserIdResponse>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
}
