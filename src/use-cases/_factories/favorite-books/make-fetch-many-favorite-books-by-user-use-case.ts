import { PrismaFavoriteBooksRepository } from "@/repositories/prisma/prisma-favorite-books-repository";
import { FetchManyFavoriteBooksByUserUseCase } from "@/use-cases/fetch-many-favorite-books-by-user-use-case";

export function makeFetchManyFavoriteBooksByUserUseCase() {
    const favoriteBooksRepository = new PrismaFavoriteBooksRepository();
    const useCase = new FetchManyFavoriteBooksByUserUseCase(favoriteBooksRepository);

    return useCase;
}
