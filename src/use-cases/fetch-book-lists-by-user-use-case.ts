import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/book-lists-repository";

interface FetchBookListsByUserUseCaseRequest {
    userId: string;
    q: string;
    bookId?: string;
}

export class FetchBookListsByUserUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ userId, q, bookId }: FetchBookListsByUserUseCaseRequest): Promise<BookList[]> {
        const bookList = await this.booksListsRepository.findManyByUserId(userId, q, bookId);

        return bookList;
    }
}
