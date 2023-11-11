import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByBookUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-book";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function fetchManyByBook(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyReadsByBookParamsSchema = z.object({
        bookId: z.string(),
    });

    const fetchManyReadsByBookQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { bookId } = fetchManyReadsByBookParamsSchema.parse(request.params);
        const { page, perPage } = fetchManyReadsByBookQuerySchema.parse(request.query);

        const fetchManyReadsByBookUseCase = makeFetchManyReadsByBookUseCase();
        const { items, total } = await fetchManyReadsByBookUseCase.execute({
            bookId,
            page,
            perPage,
        });

        reply.status(200).send(
            transformKeysToCamelCase({
                items,
                total,
            }),
        );
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[READS - Fetch many by book]: ",
        });
    }
}
