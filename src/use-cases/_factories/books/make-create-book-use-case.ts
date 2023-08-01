import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { CreateBookUseCase } from "@/use-cases/create-book-use-case";

export function makeCreateBookUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new CreateBookUseCase(booksRepository);

    return useCase;
}
