import { CreateBookUseCase } from "../create-book-use-case";
import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";

export function makeCreateBookUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new CreateBookUseCase(booksRepository);

    return useCase;
}
