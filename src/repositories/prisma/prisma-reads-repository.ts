import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ReadsRepository, findManyByBookByUserIdRequest } from "../reads-repository";

export class PrismaReadRepository implements ReadsRepository {
    async findManyByBookByUserId({ userId, bookId }: findManyByBookByUserIdRequest) {
        const reads = await prisma.read.findMany({
            where: {
                user_id: userId,
                book_id: bookId,
            },
            include: {
                progress: true,
            },
        });

        return reads;
    }

    async create(data: Prisma.ReadUncheckedCreateInput) {
        const read = await prisma.read.create({
            data,
        });

        return read;
    }
}
