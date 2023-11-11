import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetBookUseCase } from "@/use-cases/_factories/books/make-get-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function findUnique(request: FastifyRequest, reply: FastifyReply) {
    const findUniqueBookParamsSchema = z.object({
        id: z.string(),
    });

    try {
        const { id } = findUniqueBookParamsSchema.parse(request.params);

        const getBookUseCase = makeGetBookUseCase();
        const book = await getBookUseCase.execute({ id });

        if (!book) {
            reply.status(200).send(null);
            return;
        }

        reply.status(200).send(transformKeysToCamelCase(book));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOKS - Find unique]: ",
        });
    }
}
