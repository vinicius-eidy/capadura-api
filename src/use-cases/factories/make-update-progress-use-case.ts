import { PrismaProgressRepository } from "@/repositories/prisma/prisma-progress-repository";
import { UpdateProgressUseCase } from "../update-progress-use-case";

export function makeUpdateProgressUseCase() {
    const progressRepository = new PrismaProgressRepository();
    const useCase = new UpdateProgressUseCase(progressRepository);

    return useCase;
}
