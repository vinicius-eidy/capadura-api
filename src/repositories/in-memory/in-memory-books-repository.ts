import { randomUUID } from "node:crypto";
import { Book, Prisma } from "@prisma/client";

import { BooksRepository, FindManyBookIdsInput } from "../books-repository";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";

export class InMemoryBooksRepository implements BooksRepository {
    public items: Book[] = [];

    async findById(bookId: string) {
        const book = this.items.find((item) => item.id === bookId);

        return book ?? null;
    }

    async findManyIds({ page, perPage }: FindManyBookIdsInput) {
        const books = this.items
            .map((item) => ({
                id: item.id,
            }))
            .slice((page - 1) * perPage, page * perPage);

        return books;
    }

    async update(data: Prisma.BookUpdateInput) {
        let updateItem = this.items.find((item) => item.id === data.id);

        if (!updateItem) {
            throw new ResourceNotFoundError();
        }

        const {
            subtitle,
            authors,
            publisher,
            publish_date,
            language,
            page_count,
            description,
            image_key,
        } = updateItem;

        updateItem = {
            ...updateItem,
            subtitle: (data.subtitle ?? subtitle) as string | null,
            authors: (data.authors ?? authors) as string[],
            publisher: (data.publisher ?? publisher) as string | null,
            publish_date: (data.publish_date ?? publish_date) as Date | null,
            language: (data.language ?? language) as string | null,
            page_count: (data.page_count ?? page_count) as number | null,
            description: (data.description ?? description) as string | null,
            image_key: (data.image_key ?? image_key) as string | null,
        };
        return updateItem;
    }

    async create(data: Prisma.BookUncheckedCreateInput) {
        const {
            id = randomUUID(),
            title,
            subtitle = null,
            authors = [],
            publisher = null,
            publish_date = null,
            language = null,
            page_count = null,
            description = null,
            image_key = null,
        } = data;

        const book: Book = {
            id,
            title,
            subtitle,
            authors: Array.isArray(authors) ? authors : [authors as string],
            publisher,
            publish_date: publish_date ? new Date(publish_date) : null,
            language,
            page_count,
            description,
            image_key,
        };

        this.items.push(book);

        return book;
    }
}
