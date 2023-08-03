import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-book-lists-repository";
import { FetchBookListsByUserUseCase } from "@/use-cases/fetch-book-lists-by-user-use-case";

export function makeFetchBookListsByUserUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new FetchBookListsByUserUseCase(bookListsRepository);

    return useCase;
}
