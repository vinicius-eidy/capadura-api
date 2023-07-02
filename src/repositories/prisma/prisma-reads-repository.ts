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
            orderBy: {
                start_date: "desc",
            },
            include: {
                progress: {
                    orderBy: {
                        created_at: "desc",
                    },
                    take: 3,
                },
            },
        });

        return reads;
    }

    async update(data: Prisma.ReadUpdateInput) {
        const { id, status, is_private } = data;

        const updateData: Prisma.ReadUpdateInput = {};

        if (status !== undefined) {
            updateData.status = status;
        }
        if (is_private !== undefined) {
            updateData.is_private = is_private;
        }

        const progress = await prisma.read.update({
            where: {
                id: id as string,
            },
            data: updateData,
        });

        return progress;
    }

    async create(data: Prisma.ReadUncheckedCreateInput) {
        const read = await prisma.read.create({
            data,
        });

        return read;
    }
}
