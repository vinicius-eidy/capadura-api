import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-book-lists-repository";
import { UpdateBookListUseCase } from "@/use-cases/update-book-list-use-case";

export function makeUpdateBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new UpdateBookListUseCase(bookListsRepository);

    return useCase;
}
