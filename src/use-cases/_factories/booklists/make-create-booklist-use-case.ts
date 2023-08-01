import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-booklists-repository";
import { CreateBookListUseCase } from "@/use-cases/create-booklist-use-case";

export function makeCreateBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new CreateBookListUseCase(bookListsRepository);

    return useCase;
}
