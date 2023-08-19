import { randomUUID } from "node:crypto";
import { Prisma, Book, UserActivity } from "@prisma/client";
import { UserActivitiesRepository, findManyByUserIdData } from "../user-activities-repository";

export class InMemoryUserActivitiesRepository implements UserActivitiesRepository {
    public items: (UserActivity & {
        books?: Book[];
    })[] = [];

    async findManyByUserId({ userId, page, perPage }: findManyByUserIdData) {
        const userActivities = this.items
            .filter((item) => item.user_id === userId)
            .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

        return userActivities;
    }

    async create(data: Prisma.UserActivityUncheckedCreateInput) {
        const { id, activity, activity_type, created_at, book_id, user_id } = data;
        const userActivity = {
            id: id || randomUUID(),
            activity: activity || null,
            activity_type,
            created_at: (created_at as Date) || new Date(),
            book_id: book_id || null,
            user_id,
            books: undefined,
        };

        this.items.push(userActivity);

        return userActivity;
    }
}
