import { BookListsRepository } from "@/repositories/booklist-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteBookListUseCaseRequest {
    bookListId: string;
    userId: string;
}

export class DeleteBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ bookListId, userId }: DeleteBookListUseCaseRequest): Promise<void> {
        try {
            const existentBookList = await this.booksListsRepository.findUniqueById(bookListId);

            if (!existentBookList) {
                throw new ResourceNotFoundError();
            }

            if (existentBookList?.user_id !== userId) {
                throw new UnauthorizedError();
            }

            return await this.booksListsRepository.delete(bookListId);
        } catch (err) {
            throw err;
        }
    }
}
