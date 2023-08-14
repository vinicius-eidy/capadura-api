import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/book-lists-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface BookListWithImageUrl extends BookList {
    imageUrl?: string;
}

interface FetchBookListsByUserUseCaseRequest {
    userId: string;
    q: string;
    bookId?: string;
}

export class FetchBookListsByUserUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({
        userId,
        q,
        bookId,
    }: FetchBookListsByUserUseCaseRequest): Promise<BookListWithImageUrl[]> {
        const bookLists: BookListWithImageUrl[] = await this.booksListsRepository.findManyByUserId(
            userId,
            q,
            bookId,
        );

        bookLists.forEach((bookList) => {
            if (bookList.image_key) {
                bookList.imageUrl = getSignedUrlUtil({ key: bookList.image_key });
            }
        });

        return bookLists;
    }
}
