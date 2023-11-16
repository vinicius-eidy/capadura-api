import { Book } from "@prisma/client";

import { getRedis, setRedis } from "@/lib/redis";
import { BooksRepository } from "@/repositories/books-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

interface GetBookUseCaseRequest {
    id: string;
}

export class GetBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({ id }: GetBookUseCaseRequest): Promise<BookWithImageUrl | null> {
        const cachedBook = await getRedis<BookWithImageUrl>(id);
        if (cachedBook) {
            return cachedBook;
        }

        const book: BookWithImageUrl | null = await this.booksRepository.findById(id);

        if (!book) return null;

        if (book.image_key) {
            book.imageUrl = getSignedUrlUtil({ key: book.image_key });
        }

        await setRedis(id, book);

        return book;
    }
}
