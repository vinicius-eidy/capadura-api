import { Book, FavoriteBook } from "@prisma/client";

import { getSignedUrlUtil } from "@/utils/get-signed-url";

import { FavoriteBooksRepository } from "@/repositories/favorite-books-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";
import { BooksRepository } from "@/repositories/books-repository";

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

interface FavoriteBookWithBook extends FavoriteBook {
    book: BookWithImageUrl;
}

interface UpdateFavoriteBookUseCaseRequest {
    favoriteBookId: string;
    order?: number;
    bookId: string;
    userId: string;
}

export class UpdateFavoriteBookUseCase {
    constructor(
        private favoriteBooksRepository: FavoriteBooksRepository,
        private booksRepository: BooksRepository,
    ) {}

    async execute({
        favoriteBookId,
        order,
        bookId,
        userId,
    }: UpdateFavoriteBookUseCaseRequest): Promise<FavoriteBookWithBook> {
        const bookListToUpdate = await this.favoriteBooksRepository.findUnique(favoriteBookId);
        const relationedBook = await this.booksRepository.findById(bookId);

        if (!bookListToUpdate || !relationedBook) {
            throw new ResourceNotFoundError();
        }

        if (bookListToUpdate.user_id !== userId) {
            throw new UnauthorizedError();
        }

        const favoriteBook = await this.favoriteBooksRepository.update({
            id: favoriteBookId,
            order,
            book: {
                connect: {
                    id: bookId,
                },
            },
        });

        let imageUrl;
        if (relationedBook.image_key) {
            imageUrl = getSignedUrlUtil({ key: relationedBook.image_key });
        }

        const relationedBookWithImageUrl = {
            ...relationedBook,
            imageUrl,
        };

        return {
            ...favoriteBook,
            book: relationedBookWithImageUrl,
        };
    }
}
