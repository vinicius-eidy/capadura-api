import { PrismaBooksOnBookListsRepository } from "@/repositories/prisma/prisma-books-on-book-lists-repository";
import { CreateBookOnBookListUseCase } from "@/use-cases/create-book-on-book-list-use-case";

export function makeCreateBookOnBookListUseCase() {
    const booksOnBookListsRepository = new PrismaBooksOnBookListsRepository();
    const useCase = new CreateBookOnBookListUseCase(booksOnBookListsRepository);

    return useCase;
}
