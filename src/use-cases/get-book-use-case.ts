import { Book } from "@prisma/client";
import { BooksRepository } from "@/repositories/books-repository";

interface GetBookUseCaseRequest {
    id: string;
}

export class GetBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({ id }: GetBookUseCaseRequest): Promise<Book | null> {
        const book = await this.booksRepository.findById(id);

        return book;
    }
}
