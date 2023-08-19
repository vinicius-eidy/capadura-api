import { PrismaUserActivitiesRepository } from "@/repositories/prisma/prisma-user-activities-repository";
import { CreateUserActivityUseCase } from "@/use-cases/create-user-activity-use-case";

export function makeCreateUserActivityUseCase() {
    const userActivitiesRepository = new PrismaUserActivitiesRepository();
    const useCase = new CreateUserActivityUseCase(userActivitiesRepository);

    return useCase;
}
