import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { GetTotalFinishedReadsCountByBookUseCase } from "@/use-cases/get-total-finished-reads-count-by-book-use-case";

export function makeGetTotalFinishedReadsCountByBookUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new GetTotalFinishedReadsCountByBookUseCase(readsRepository);

    return useCase;
}
