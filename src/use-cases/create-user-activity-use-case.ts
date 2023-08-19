import { UserActivity } from "@prisma/client";

import { UserActivitiesRepository } from "@/repositories/user-activities-repository";

export type activityTypeOptions =
    | "LIKE_BOOK"
    | "START_READ"
    | "PAUSE_READ"
    | "RESUME_READ"
    | "ADD_BOOK_PROGRESS"
    | "ADD_BOOK_REVIEW";

interface CreateUserActivityUseCaseRequest {
    activity?: string;
    activityType: activityTypeOptions;
    bookId?: string;
    userId: string;
}

export class CreateUserActivityUseCase {
    constructor(private userActivitiesRepository: UserActivitiesRepository) {}

    async execute({
        activity,
        activityType,
        bookId,
        userId,
    }: CreateUserActivityUseCaseRequest): Promise<UserActivity> {
        const userActivity = await this.userActivitiesRepository.create({
            activity,
            activity_type: activityType,
            book_id: bookId,
            user_id: userId,
        });

        return userActivity;
    }
}
