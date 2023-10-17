import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FindUniqueReadUseCase } from "@/use-cases/find-unique-read-use-case";

export function makeFindUniqueReadUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FindUniqueReadUseCase(readsRepository);

    return useCase;
}
