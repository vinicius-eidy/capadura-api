import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FetchManyReadsByUserForUniqueBookUseCase } from "@/use-cases/fetch-many-reads-by-user-for-unique-book-use-case";

export function makeFetchManyReadsByUserForUniqueBookUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FetchManyReadsByUserForUniqueBookUseCase(readsRepository);

    return useCase;
}
