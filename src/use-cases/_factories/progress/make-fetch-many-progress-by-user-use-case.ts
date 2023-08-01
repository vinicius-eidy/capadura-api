import { PrismaProgressRepository } from "@/repositories/prisma/prisma-progress-repository";
import { FetchManyProgressByUserUseCase } from "@/use-cases/fetch-progress-by-user-use-case";

export function makeFetchManyProgressByUserUseCase() {
    const progressRepository = new PrismaProgressRepository();
    const useCase = new FetchManyProgressByUserUseCase(progressRepository);

    return useCase;
}
