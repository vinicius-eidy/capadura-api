import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { UpdateBookUseCase } from "@/use-cases/update-book-use-case";

export function makeUpdateBookUseCase() {
    const booksRepository = new PrismaBooksRepository();
    const useCase = new UpdateBookUseCase(booksRepository);

    return useCase;
}
