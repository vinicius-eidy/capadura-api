import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ReadsRepository, findManyByBookByUserIdRequest } from "../reads-repository";

export class PrismaReadRepository implements ReadsRepository {
    async findManyByBookByUserId({ userId, bookId, page }: findManyByBookByUserIdRequest) {
        const reads = await prisma.read.findMany({
            where: {
                user_id: userId,
                book_id: bookId,
            },
            take: 20,
            skip: (page - 1) * 20,
        });

        return {
            items: reads,
            total: reads.length,
        };
    }

    async create(data: Prisma.ReadUncheckedCreateInput) {
        const read = await prisma.read.create({
            data,
        });

        return read;
    }
}
