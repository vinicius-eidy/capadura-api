import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { DeleteReadUseCase } from "@/use-cases/delete-read-use-case";

export function makeDeleteReadUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new DeleteReadUseCase(readsRepository);

    return useCase;
}
