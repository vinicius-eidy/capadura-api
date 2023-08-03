import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/booklist-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface UpdateBookListUseCaseRequest {
    bookListId: string;
    name?: string;
    description?: string;
    bookId?: string;
    userId: string;
}

export class UpdateBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({
        bookListId,
        name,
        description,
        bookId,
        userId,
    }: UpdateBookListUseCaseRequest): Promise<BookList> {
        const existentBookList = await this.booksListsRepository.findUniqueById(bookListId);

        if (!existentBookList) {
            throw new ResourceNotFoundError();
        }

        if (existentBookList?.user_id !== userId) {
            throw new UnauthorizedError();
        }

        const bookList = await this.booksListsRepository.update({
            bookListId,
            name,
            description,
            bookId,
        });

        return bookList;
    }
}
