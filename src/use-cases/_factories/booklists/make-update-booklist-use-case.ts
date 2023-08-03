import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-booklists-repository";
import { UpdateBookListUseCase } from "@/use-cases/update-booklist-use-case";

export function makeUpdateBookListUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new UpdateBookListUseCase(bookListsRepository);

    return useCase;
}
