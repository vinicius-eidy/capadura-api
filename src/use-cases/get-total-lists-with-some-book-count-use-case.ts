import { BooksOnBookListsRepository } from "@/repositories/books-on-book-lists-repository";

interface GetTotalListsWithSomeBookCountUseCaseRequest {
    bookId: string;
}

interface GetTotalListsWithSomeBookCountUseCaseResponse {
    total: number;
}

export class GetTotalListsWithSomeBookCountUseCase {
    constructor(private booksOnBookListsRepository: BooksOnBookListsRepository) {}

    async execute({
        bookId,
    }: GetTotalListsWithSomeBookCountUseCaseRequest): Promise<GetTotalListsWithSomeBookCountUseCaseResponse> {
        const total = await this.booksOnBookListsRepository.getTotalListsWithSomeBookCount(bookId);

        return {
            total,
        };
    }
}
