import { PrismaProgressRepository } from "@/repositories/prisma/prisma-progress-repository";
import { DeleteProgressUseCase } from "@/use-cases/delete-progress-use-case";

export function makeDeleteProgressUseCase() {
    const progressRepository = new PrismaProgressRepository();
    const useCase = new DeleteProgressUseCase(progressRepository);

    return useCase;
}
