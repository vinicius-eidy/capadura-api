import { PrismaFavoriteBooksRepository } from "@/repositories/prisma/prisma-favorite-books-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { FetchManyFavoriteBooksByUserUseCase } from "@/use-cases/fetch-many-favorite-books-by-user-use-case";

export function makeFetchManyFavoriteBooksByUserUseCase() {
    const favoriteBooksRepository = new PrismaFavoriteBooksRepository();
    const usersRepository = new PrismaUsersRepository();
    const useCase = new FetchManyFavoriteBooksByUserUseCase(
        favoriteBooksRepository,
        usersRepository,
    );

    return useCase;
}
