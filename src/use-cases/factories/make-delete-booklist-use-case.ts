import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-booklists-repository";
import { DeleteBookListUseCase } from "../delete-booklist-use-case";

export function makeDeleteBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new DeleteBookListUseCase(bookListsRepository);

    return useCase;
}
