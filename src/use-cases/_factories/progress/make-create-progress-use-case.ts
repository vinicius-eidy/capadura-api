import { PrismaProgressRepository } from "@/repositories/prisma/prisma-progress-repository";
import { CreateProgressUseCase } from "@/use-cases/create-progress-use-case";

export function makeCreateProgressUseCase() {
    const progressRepository = new PrismaProgressRepository();
    const useCase = new CreateProgressUseCase(progressRepository);

    return useCase;
}
