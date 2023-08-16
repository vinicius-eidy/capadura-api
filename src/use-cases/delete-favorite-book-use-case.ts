import { FavoriteBooksRepository } from "@/repositories/favorite-books-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteFavoriteBookUseCaseRequest {
    favoriteBookId: string;
    userId: string;
}

export class DeleteFavoriteBookUseCase {
    constructor(private booksOnBookListsRepository: FavoriteBooksRepository) {}

    async execute({ favoriteBookId, userId }: DeleteFavoriteBookUseCaseRequest): Promise<void> {
        const existentFavoriteBook = await this.booksOnBookListsRepository.findUnique(
            favoriteBookId,
        );

        if (!existentFavoriteBook) {
            throw new ResourceNotFoundError();
        }

        if (existentFavoriteBook.user_id !== userId) {
            throw new UnauthorizedError();
        }

        return await this.booksOnBookListsRepository.delete(favoriteBookId);
    }
}
