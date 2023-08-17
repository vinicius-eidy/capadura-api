import { FavoriteBook } from "@prisma/client";
import { FavoriteBooksRepository } from "@/repositories/favorite-books-repository";

import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface CreateFavoriteBookUseCaseRequest {
    order: number;
    bookId: string;
    userId: string;
}

export class CreateFavoriteBookUseCase {
    constructor(private favoriteBooksRepository: FavoriteBooksRepository) {}

    async execute({
        order,
        bookId,
        userId,
    }: CreateFavoriteBookUseCaseRequest): Promise<FavoriteBook> {
        const createdFavoriteBook = await this.favoriteBooksRepository.create({
            order,
            book_id: bookId,
            user_id: userId,
        });

        // get same favorite book because .create method do not return book relation and .findUnique does
        const sameFavoriteBook = await this.favoriteBooksRepository.findUnique(
            createdFavoriteBook.id,
        );

        if (!sameFavoriteBook) {
            throw new ResourceNotFoundError();
        }

        if (sameFavoriteBook.book.image_key) {
            sameFavoriteBook.book.imageUrl = getSignedUrlUtil({
                key: sameFavoriteBook.book.image_key,
            });
        }

        return sameFavoriteBook as FavoriteBook;
    }
}
