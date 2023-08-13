import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/book-lists-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface BookListWithImageUrl extends BookList {
    imageUrl: string | null;
}

interface UpdateBookListUseCaseRequest {
    bookListId: string;
    name?: string;
    description?: string;
    userId: string;
}

export class UpdateBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({
        bookListId,
        name,
        description,
        userId,
    }: UpdateBookListUseCaseRequest): Promise<BookListWithImageUrl> {
        const bookListToUpdate = await this.booksListsRepository.findUniqueById(bookListId);

        if (!bookListToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (bookListToUpdate.user_id !== userId) {
            throw new UnauthorizedError();
        }

        const bookList = await this.booksListsRepository.update({
            bookListId,
            name,
            description,
        });

        let imageUrl = null;
        if (bookList.image_key) {
            imageUrl = getSignedUrlUtil({ key: bookList.image_key });
        }

        const bookListWithImageUrl = {
            ...bookList,
            imageUrl,
        };

        return bookListWithImageUrl;
    }
}
