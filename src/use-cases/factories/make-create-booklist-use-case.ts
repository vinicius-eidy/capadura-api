import { CreateBookListUseCase } from "../create-booklist-use-case";
import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-booklists-repository";

export function makeCreateBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new CreateBookListUseCase(bookListsRepository);

    return useCase;
}
