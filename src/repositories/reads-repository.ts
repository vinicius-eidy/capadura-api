import { Prisma, Read } from "@prisma/client";

export interface findManyByBookByUserIdRequest {
    userId: string;
    bookId: string;
}

export interface ReadsRepository {
    findManyByBookByUserId({ userId, bookId }: findManyByBookByUserIdRequest): Promise<Read[]>;
    update(data: Prisma.ReadUpdateInput): Promise<Read | undefined>;
    create(data: Prisma.ReadUncheckedCreateInput): Promise<Read>;
}
