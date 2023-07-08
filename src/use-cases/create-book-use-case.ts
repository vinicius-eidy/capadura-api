import { BooksRepository } from "@/repositories/books-repository";
import { Book } from "@prisma/client";

interface CreateBookUseCaseRequest {
    id: string;
    title: string;
    subtitle?: string;
    authors: string[];
    publisher?: string;
    publishDate: Date | string | null;
    language?: string;
    pageCount?: number;
    description?: string;
}

interface CreateBookUseCaseResponse {
    book: Book;
}

export class CreateBookUseCase {
    constructor(private booksRepository: BooksRepository) {}

    async execute({
        id,
        title,
        subtitle,
        authors,
        publisher,
        publishDate,
        language,
        pageCount,
        description,
    }: CreateBookUseCaseRequest): Promise<CreateBookUseCaseResponse> {
        const book = await this.booksRepository.findById(id);

        if (book) {
            return {
                book,
            };
        }

        const createdBook = await this.booksRepository.create({
            id,
            title,
            subtitle,
            authors,
            publisher,
            publish_date: publishDate,
            language,
            page_count: pageCount,
            description,
        });

        return {
            book: createdBook,
        };
    }
}
