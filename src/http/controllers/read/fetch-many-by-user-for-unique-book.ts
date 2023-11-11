import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyReadsByUserForUniqueBookUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-user-for-unique-book-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function fetchManyByUserForUniqueBook(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyByUserForUniqueBookBodySchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = fetchManyByUserForUniqueBookBodySchema.parse(request.params);

        const fetchManyReadsByUserForUniqueBookUseCase =
            makeFetchManyReadsByUserForUniqueBookUseCase();
        const { items, total } = await fetchManyReadsByUserForUniqueBookUseCase.execute({
            userId: request.user.sub,
            bookId,
        });

        reply.status(200).send({
            items: transformKeysToCamelCase(items),
            total,
        });
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[READS - Fetch many by user for unique book]: ",
        });
    }
}
