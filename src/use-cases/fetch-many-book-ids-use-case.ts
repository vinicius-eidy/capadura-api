import { BooksRepository } from "@/repositories/books-repository";

interface FetchManyBookIdsUseCaseRequest {
    page: number;
    perPage: number;
}

interface FetchManyBookIdsUseCaseResponse {
    bookIds: {
        id: string;
    }[];
}

export class FetchManyBookIdsUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({
        page,
        perPage,
    }: FetchManyBookIdsUseCaseRequest): Promise<FetchManyBookIdsUseCaseResponse> {
        const bookIds = await this.booksRepository.findManyIds({ page, perPage });

        return {
            bookIds,
        };
    }
}
