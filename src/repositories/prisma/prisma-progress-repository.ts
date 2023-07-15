import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProgressRepository, findManyByRead, findManyByUser } from "../progress-repository";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export class PrismaProgressRepository implements ProgressRepository {
    async findManyByRead({ readId, page, perPage }: findManyByRead) {
        const [progress, total] = await Promise.all([
            prisma.progress.findMany({
                where: {
                    read_id: readId,
                },
                orderBy: {
                    created_at: "desc",
                },
                take: perPage,
                skip: (page - 1) * perPage,
            }),
            prisma.progress.count({
                where: {
                    read_id: readId,
                },
            }),
        ]);

        const progressCamelCase = transformKeysToCamelCase(progress);

        return { progress: progressCamelCase, total };
    }

    async findManyByUser({ userId, page, perPage }: findManyByUser) {
        const [progress, total] = await Promise.all([
            prisma.progress.findMany({
                where: {
                    user_id: userId,
                },
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    read: {
                        include: {
                            book: true,
                        },
                    },
                },
                take: perPage,
                skip: (page - 1) * perPage,
            }),
            prisma.progress.count({
                where: {
                    user_id: userId,
                },
            }),
        ]);

        const progressCamelCase = transformKeysToCamelCase(progress);

        return { progress: progressCamelCase, total };
    }

    async update(data: Prisma.ProgressUpdateInput) {
        const { id, ...updateData } = data;

        const progress = await prisma.progress.update({
            where: {
                id: id as string,
            },
            data: updateData,
        });

        const progressCamelCase = transformKeysToCamelCase(progress);

        return progressCamelCase;
    }

    async create(data: Prisma.ProgressUncheckedCreateInput) {
        const progress = await prisma.progress.create({
            data,
        });

        const progressCamelCase = transformKeysToCamelCase(progress);

        return progressCamelCase;
    }
}
