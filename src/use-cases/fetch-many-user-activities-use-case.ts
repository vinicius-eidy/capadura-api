import { UserActivity } from "@prisma/client";

import { UserActivitiesRepository } from "@/repositories/user-activities-repository";

interface FetchManyUserActivitiesUseCaseRequest {
    userId: string;
    page: number;
    perPage: number;
}

export class FetchManyUserActivitiesUseCase {
    constructor(private userActivitiesRepository: UserActivitiesRepository) {}

    async execute({
        userId,
        page,
        perPage,
    }: FetchManyUserActivitiesUseCaseRequest): Promise<UserActivity[]> {
        const userActivities = await this.userActivitiesRepository.findManyByUserId({
            userId,
            page,
            perPage,
        });

        return userActivities;
    }
}
