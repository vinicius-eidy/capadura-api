import {
    FavoriteBooksRepository,
    FavoriteBooksWithBookAndBookImageUrl,
} from "@/repositories/favorite-books-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface FetchManyFavoriteBooksByUserUseCaseRequest {
    username: string;
}

export class FetchManyFavoriteBooksByUserUseCase {
    constructor(
        private favoriteBooksRepository: FavoriteBooksRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        username,
    }: FetchManyFavoriteBooksByUserUseCaseRequest): Promise<
        FavoriteBooksWithBookAndBookImageUrl[]
    > {
        const user = await this.usersRepository.findByUsername(username);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        const favoriteBooks = await this.favoriteBooksRepository.findManyByUserId(user.id);

        favoriteBooks.forEach((favoriteBook) => {
            if (!favoriteBook || !favoriteBook.book) return;

            if (favoriteBook.book.image_key) {
                favoriteBook.book.imageUrl = getSignedUrlUtil({ key: favoriteBook.book.image_key });
            }
        });

        return favoriteBooks;
    }
}
