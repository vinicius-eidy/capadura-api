import { PrismaProgressRepository } from "@/repositories/prisma/prisma-progress-repository";
import { FetchManyProgressByReadUseCase } from "../fetch-progress-by-read-use-case";

export function makeFetchManyProgressByReadUseCase() {
    const progressRepository = new PrismaProgressRepository();
    const useCase = new FetchManyProgressByReadUseCase(progressRepository);

    return useCase;
}
