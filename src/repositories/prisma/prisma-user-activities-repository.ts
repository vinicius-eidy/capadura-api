import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UserActivitiesRepository, findManyByUserIdData } from "../user-activities-repository";

export class PrismaUserActivitiesRepository implements UserActivitiesRepository {
    async findManyByUserId({ userId, page, perPage }: findManyByUserIdData) {
        const userActivities = await prisma.userActivity.findMany({
            where: {
                user_id: userId,
            },
            orderBy: {
                created_at: "desc",
            },
            include: {
                book: true,
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });

        return userActivities;
    }

    async create(data: Prisma.UserActivityUncheckedCreateInput) {
        const userActivities = await prisma.userActivity.create({
            data,
        });

        return userActivities;
    }
}
