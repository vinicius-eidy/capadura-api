import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/booklist-repository";

interface FetchBookListsByUserUseCaseRequest {
    userId: string;
}

export class FetchBookListsByUserUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ userId }: FetchBookListsByUserUseCaseRequest): Promise<BookList[]> {
        const bookList = await this.booksListsRepository.findManyByUserId(userId);

        return bookList;
    }
}
