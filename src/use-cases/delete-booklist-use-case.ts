import { BookListsRepository } from "@/repositories/booklist-repository";

interface DeleteBookListUseCaseRequest {
    bookListId: string;
    userId: string;
}

export class DeleteBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ bookListId, userId }: DeleteBookListUseCaseRequest): Promise<void> {
        try {
            return await this.booksListsRepository.delete(bookListId, userId);
        } catch (err) {
            throw err;
        }
    }
}
