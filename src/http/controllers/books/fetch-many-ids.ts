import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyBooksIdsUseCase } from "@/use-cases/_factories/books/make-fetch-many-book-ids-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function fetchManyIds(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyBookIdsQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(30),
    });

    try {
        const { page, perPage } = fetchManyBookIdsQuerySchema.parse(request.query);

        const fetchManyBookIdsUseCase = makeFetchManyBooksIdsUseCase();
        const { bookIds } = await fetchManyBookIdsUseCase.execute({
            page,
            perPage,
        });

        reply.status(200).send(transformKeysToCamelCase(bookIds));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOKS - Fetch many ids]: ",
        });
    }
}
