import { PrismaProgressRepository } from "@/repositories/prisma/prisma-progress-repository";
import { GetPagesReadedByDayUseCase } from "@/use-cases/get-pages-readed-by-day-use-case";

export function makeGetPagesReadedByDayUseCase() {
    const progressRepository = new PrismaProgressRepository();
    const useCase = new GetPagesReadedByDayUseCase(progressRepository);

    return useCase;
}
