import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProgressRepository } from "../progress-repository";

export class PrismaProgressRepository implements ProgressRepository {
    async findManyByRead(readId: string) {
        const progress = await prisma.progress.findMany({
            where: {
                read_id: readId,
            },
        });

        return progress;
    }

    async create(data: Prisma.ProgressUncheckedCreateInput) {
        const progress = await prisma.progress.create({
            data,
        });

        return progress;
    }
}
