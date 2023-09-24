import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { FetchManyBooksUseCase } from "@/use-cases/fetch-many-books-use-case";

export function makeFetchManyBooksUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new FetchManyBooksUseCase(booksRepository);

    return useCase;
}
