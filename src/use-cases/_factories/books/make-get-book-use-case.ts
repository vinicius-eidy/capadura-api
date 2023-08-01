import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { GetBookUseCase } from "@/use-cases/get-book-use-case";

export function makeGetBookUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new GetBookUseCase(booksRepository);

    return useCase;
}
