import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyBooksUseCase } from "@/use-cases/_factories/books/make-fetch-many-books-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function fetchMany(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyBooksQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(30),
    });

    try {
        const { page, perPage } = fetchManyBooksQuerySchema.parse(request.query);

        const fetchManyBooksUseCase = makeFetchManyBooksUseCase();
        const { books } = await fetchManyBooksUseCase.execute({
            page,
            perPage,
        });

        reply.status(200).send(transformKeysToCamelCase(books));
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
