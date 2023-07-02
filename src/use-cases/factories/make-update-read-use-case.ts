import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { UpdateReadUseCase } from "../update-read-use-case";

export function makeUpdateReadUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new UpdateReadUseCase(readsRepository);

    return useCase;
}
