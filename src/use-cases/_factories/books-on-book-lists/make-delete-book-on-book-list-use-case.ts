import { PrismaBooksOnBookListsRepository } from "@/repositories/prisma/prisma-books-on-book-lists-repository";
import { DeleteBookOnBookListUseCase } from "@/use-cases/delete-book-on-book-list-use-case";

export function makeDeleteBookOnBookListUseCase() {
    const booksOnBookListsRepository = new PrismaBooksOnBookListsRepository();
    const useCase = new DeleteBookOnBookListUseCase(booksOnBookListsRepository);

    return useCase;
}
