import { Prisma, Read } from "@prisma/client";

export interface findManyByBookByUserIdRequest {
    userId: string;
    bookId: string;
}

export interface ReadsRepository {
    findManyByBookByUserId({ userId, bookId }: findManyByBookByUserIdRequest): Promise<Read[]>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
}
