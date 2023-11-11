import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyByBookListUseCase } from "@/use-cases/_factories/books-on-book-lists/make-fetch-many-by-book-list-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function fetchManyByBookList(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyByBookListQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(30),
    });

    const fetchManyByBookListParamsSchema = z.object({
        bookListId: z.string(),
    });

    try {
        const { page, perPage } = fetchManyByBookListQuerySchema.parse(request.query);
        const { bookListId } = fetchManyByBookListParamsSchema.parse(request.params);

        const fetchManyByBookListUseCase = makeFetchManyByBookListUseCase();
        const booksOnBookList = await fetchManyByBookListUseCase.execute({
            bookListId,
            page,
            perPage,
        });

        reply.status(200).send(transformKeysToCamelCase(booksOnBookList));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOKS ON BOOK LIST - Fetch many by book list]: ",
        });
    }
}
