import { Prisma, UserActivity } from "@prisma/client";

export interface findManyByUserIdData {
    userId: string;
    page: number;
    perPage: number;
}
export interface UserActivitiesRepository {
    findManyByUserId({ userId, page, perPage }: findManyByUserIdData): Promise<UserActivity[]>;
    create(data: Prisma.UserActivityUncheckedCreateInput): Promise<UserActivity>;
}
