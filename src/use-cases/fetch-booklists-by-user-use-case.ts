import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/booklist-repository";

interface FetchBookListsByUserUseCaseRequest {
    userId: string;
    q: string;
}

export class FetchBookListsByUserUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ userId, q }: FetchBookListsByUserUseCaseRequest): Promise<BookList[]> {
        const bookList = await this.booksListsRepository.findManyByUserId(userId, q);

        return bookList;
    }
}
