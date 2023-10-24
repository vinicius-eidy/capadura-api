import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
    ProgressRepository,
    FindManyByReadInput,
    FindManyByUserInput,
    GetLastProgressPageInput,
    getPagesReadedByDayInput,
    GetPagesReadedByDayOutput,
} from "../progress-repository";

export class PrismaProgressRepository implements ProgressRepository {
    async findUniqueById(progressId: string) {
        const progress = await prisma.progress.findUnique({
            where: {
                id: progressId,
            },
        });

        return progress || null;
    }

    async findManyByRead({ readId, page, perPage }: FindManyByReadInput) {
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

        return { progress, total };
    }

    async findManyByUser({ userId, page, perPage }: FindManyByUserInput) {
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
                        select: {
                            id: true,
                            book_id: true,
                            book: {
                                select: {
                                    id: true,
                                    title: true,
                                    page_count: true,
                                    image_key: true,
                                },
                            },
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

        return { progress, total };
    }

    async getLastProgressPage({ readId, lessThanPages }: GetLastProgressPageInput) {
        const progress = await prisma.progress.findFirst({
            where: {
                read_id: readId,
                page: {
                    lt: lessThanPages,
                },
            },
            select: {
                page: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!progress) return null;

        return progress.page;
    }

    async getPagesReadedByDay({ userId, startDate, endDate }: getPagesReadedByDayInput) {
        const pagesReadedByDay: GetPagesReadedByDayOutput = await prisma.$queryRawUnsafe(` 
            WITH date_series AS (
                SELECT generate_series(
                    DATE '${startDate}'::DATE,
                    DATE '${endDate}'::DATE,
                    INTERVAL '1 day'
                )::DATE as date
            )
            SELECT TO_CHAR(ds.date, 'YYYY-MM-DD') as created_at,
                COALESCE(SUM(p.pages_read), 0)::integer as pages_readed
            FROM date_series ds
            LEFT JOIN progress p ON ds.date = DATE(p.created_at) AND p.user_id = '${userId}'
            GROUP BY ds.date
            ORDER BY ds.date;
        `);

        return pagesReadedByDay;
    }

    async update(data: Prisma.ProgressUpdateInput) {
        const { id, ...updateData } = data;

        const progress = await prisma.progress.update({
            where: {
                id: id as string,
            },
            data: updateData,
        });

        return progress;
    }

    async create(data: Prisma.ProgressUncheckedCreateInput) {
        const progress = await prisma.progress.create({
            data,
        });

        return progress;
    }

    async delete(progressId: string) {
        await prisma.progress.delete({
            where: {
                id: progressId,
            },
        });
    }
}
