import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { FetchManyBookIdsUseCase } from "@/use-cases/fetch-many-book-ids-use-case";

export function makeFetchManyBooksIdsUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new FetchManyBookIdsUseCase(booksRepository);

    return useCase;
}
