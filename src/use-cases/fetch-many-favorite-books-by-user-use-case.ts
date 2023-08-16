import { FavoriteBook } from "@prisma/client";
import { FavoriteBooksRepository } from "@/repositories/favorite-books-repository";

interface FetchManyFavoriteBooksByUserUseCaseRequest {
    userId: string;
}

export class FetchManyFavoriteBooksByUserUseCase {
    constructor(private favoriteBooksRepository: FavoriteBooksRepository) {}

    async execute({ userId }: FetchManyFavoriteBooksByUserUseCaseRequest): Promise<FavoriteBook[]> {
        const favoriteBooks = await this.favoriteBooksRepository.findManyByUserId(userId);

        return favoriteBooks;
    }
}
