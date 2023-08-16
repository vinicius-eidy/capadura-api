import { FavoriteBook } from "@prisma/client";
import { FavoriteBooksRepository } from "@/repositories/favorite-books-repository";

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
        const favoriteBook = await this.favoriteBooksRepository.create({
            order,
            book_id: bookId,
            user_id: userId,
        });

        return favoriteBook;
    }
}
