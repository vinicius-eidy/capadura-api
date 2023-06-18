import { GetBookUseCase } from "../get-book-use-case";
import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";

export function makeGetBookUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new GetBookUseCase(booksRepository);

    return useCase;
}
