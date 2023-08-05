import { PrismaBooksOnBookListsRepository } from "@/repositories/prisma/prisma-books-on-book-lists-repository";
import { FetchManyByBookListUseCase } from "@/use-cases/fetch-many-by-book-list-use-case";

export function makeFetchManyByBookListUseCase() {
    const booksOnBookListsRepository = new PrismaBooksOnBookListsRepository();
    const useCase = new FetchManyByBookListUseCase(booksOnBookListsRepository);

    return useCase;
}
