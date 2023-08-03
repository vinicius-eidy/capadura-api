import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-book-lists-repository";
import { DeleteBookListUseCase } from "@/use-cases/delete-book-list-use-case";

export function makeDeleteBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new DeleteBookListUseCase(bookListsRepository);

    return useCase;
}
