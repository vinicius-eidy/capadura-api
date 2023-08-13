import { Book } from "@prisma/client";
import { BooksRepository } from "@/repositories/books-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface BookWithImageUrl extends Book {
    imageUrl: string | null;
}

interface GetBookUseCaseRequest {
    id: string;
}

export class GetBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({ id }: GetBookUseCaseRequest): Promise<BookWithImageUrl | null> {
        const book = await this.booksRepository.findById(id);

        if (!book) return null;

        let imageUrl = null;
        if (book.image_key) {
            imageUrl = getSignedUrlUtil({ key: book.image_key });
        }

        const bookWithImageUrl = {
            ...book,
            imageUrl,
        };

        return bookWithImageUrl;
    }
}
