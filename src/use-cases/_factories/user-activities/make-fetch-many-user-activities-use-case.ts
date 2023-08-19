import { PrismaUserActivitiesRepository } from "@/repositories/prisma/prisma-user-activities-repository";
import { FetchManyUserActivitiesUseCase } from "@/use-cases/fetch-many-user-activities-use-case";

export function makeFetchManyUserActivitiesUseCase() {
    const userActivitiesRepository = new PrismaUserActivitiesRepository();
    const useCase = new FetchManyUserActivitiesUseCase(userActivitiesRepository);

    return useCase;
}
