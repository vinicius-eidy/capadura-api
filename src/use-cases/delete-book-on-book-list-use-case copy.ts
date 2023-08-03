import { BooksOnBookListsRepository } from "@/repositories/books-on-book-lists-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteBookOnBookListUseCaseRequest {
    bookOnBookListId: string;
    userId: string;
}

export class DeleteBookOnBookListUseCase {
    constructor(private booksOnBookListsRepository: BooksOnBookListsRepository) {}

    async execute({ bookOnBookListId, userId }: DeleteBookOnBookListUseCaseRequest): Promise<void> {
        const existentBookOnBookList = await this.booksOnBookListsRepository.findUnique(
            bookOnBookListId,
        );

        if (!existentBookOnBookList) {
            throw new ResourceNotFoundError();
        }

        if (existentBookOnBookList.book_list?.user_id !== userId) {
            throw new UnauthorizedError();
        }

        return await this.booksOnBookListsRepository.delete(bookOnBookListId);
    }
}
