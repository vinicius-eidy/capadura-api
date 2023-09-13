import { PrismaBooksOnBookListsRepository } from "@/repositories/prisma/prisma-books-on-book-lists-repository";
import { GetTotalListsWithSomeBookCountUseCase } from "@/use-cases/get-total-lists-with-some-book-count-use-case";

export function makeGetTotalListsWithSomeBookCountUseCase() {
    const booksOnBookListsRepository = new PrismaBooksOnBookListsRepository();
    const useCase = new GetTotalListsWithSomeBookCountUseCase(booksOnBookListsRepository);

    return useCase;
}
