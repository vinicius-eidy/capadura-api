import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FetchManyReadsByBookUseCase } from "@/use-cases/fetch-many-reads-by-book-use-case";

export function makeFetchManyReadsByBookUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FetchManyReadsByBookUseCase(readsRepository);

    return useCase;
}
