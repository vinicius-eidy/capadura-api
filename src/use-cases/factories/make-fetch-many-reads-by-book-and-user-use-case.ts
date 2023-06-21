import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FetchManyReadsByBookAndUserUseCase } from "../fetch-many-reads-by-book-and-user-use-case";

export function makeFetchManyReadsByBookAndUserUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FetchManyReadsByBookAndUserUseCase(readsRepository);

    return useCase;
}
