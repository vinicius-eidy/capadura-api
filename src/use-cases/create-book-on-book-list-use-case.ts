import { BooksOnBookLists } from "@prisma/client";
import { BooksOnBookListsRepository } from "@/repositories/books-on-book-lists-repository";

interface CreateBookOnBookListUseCaseRequest {
    bookId: string;
    bookListId: string;
}

export class CreateBookOnBookListUseCase {
    constructor(private booksOnBookListsRepository: BooksOnBookListsRepository) {}

    async execute({
        bookId,
        bookListId,
    }: CreateBookOnBookListUseCaseRequest): Promise<BooksOnBookLists> {
        const bookOnBookList = await this.booksOnBookListsRepository.create({
            book_id: bookId,
            book_list_id: bookListId,
        });

        return bookOnBookList;
    }
}
