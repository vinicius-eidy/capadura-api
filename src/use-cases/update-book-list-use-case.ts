import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/book-lists-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

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
        });

        return bookList;
    }
}