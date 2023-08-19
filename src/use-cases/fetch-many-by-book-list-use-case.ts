import {
    BooksOnBookListsRepository,
    BooksOnBookListsWithBook,
} from "@/repositories/books-on-book-lists-repository";

interface FetchManyByBookListUseCaseRequest {
    bookListId: string;
    page: number;
    perPage: number;
}

export class FetchManyByBookListUseCase {
    constructor(private booksOnBookListsRepository: BooksOnBookListsRepository) {}

    async execute({
        bookListId,
        page,
        perPage,
    }: FetchManyByBookListUseCaseRequest): Promise<BooksOnBookListsWithBook[] | null> {
        const booksOnBookList = await this.booksOnBookListsRepository.findManyByBookList({
            bookListId,
            page,
            perPage,
        });

        return booksOnBookList;
    }
}
