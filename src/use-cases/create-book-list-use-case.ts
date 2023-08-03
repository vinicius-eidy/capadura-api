import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/book-lists-repository";

interface CreateBookListUseCaseRequest {
    name: string;
    description?: string;
    userId: string;
}

export class CreateBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ name, description, userId }: CreateBookListUseCaseRequest): Promise<BookList> {
        const bookList = await this.booksListsRepository.create({
            name,
            description,
            user_id: userId,
        });

        return bookList;
    }
}
