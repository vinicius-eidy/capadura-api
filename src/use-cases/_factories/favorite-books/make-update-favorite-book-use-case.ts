import { PrismaFavoriteBooksRepository } from "@/repositories/prisma/prisma-favorite-books-repository";
import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { UpdateFavoriteBookUseCase } from "@/use-cases/update-favorite-book-use-case";

export function makeUpdateFavoriteBookUseCase() {
    const favoriteBooksRepository = new PrismaFavoriteBooksRepository();
    const booksRepository = new PrismaBooksRepository();

    const useCase = new UpdateFavoriteBookUseCase(favoriteBooksRepository, booksRepository);

    return useCase;
}
