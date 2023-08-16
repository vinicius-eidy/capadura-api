import { PrismaFavoriteBooksRepository } from "@/repositories/prisma/prisma-favorite-books-repository";
import { CreateFavoriteBookUseCase } from "@/use-cases/create-favorite-book-use-case";

export function makeCreateFavoriteBookUseCase() {
    const favoriteBooksRepository = new PrismaFavoriteBooksRepository();
    const useCase = new CreateFavoriteBookUseCase(favoriteBooksRepository);

    return useCase;
}
