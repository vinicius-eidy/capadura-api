import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FetchManyFinishedReadsUseCase } from "@/use-cases/fetch-many-finished-reads-use-case";

export function makeFetchManyFinishedReadsUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FetchManyFinishedReadsUseCase(readsRepository);

    return useCase;
}
