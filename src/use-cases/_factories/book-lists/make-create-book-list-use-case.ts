import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-book-lists-repository";
import { CreateBookListUseCase } from "@/use-cases/create-book-list-use-case";

export function makeCreateBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new CreateBookListUseCase(bookListsRepository);

    return useCase;
}
