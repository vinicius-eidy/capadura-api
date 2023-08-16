import { PrismaFavoriteBooksRepository } from "@/repositories/prisma/prisma-favorite-books-repository";
import { DeleteFavoriteBookUseCase } from "@/use-cases/delete-favorite-book-use-case";

export function makeDeleteFavoriteBookUseCase() {
    const favoriteBooksRepository = new PrismaFavoriteBooksRepository();
    const useCase = new DeleteFavoriteBookUseCase(favoriteBooksRepository);

    return useCase;
}
