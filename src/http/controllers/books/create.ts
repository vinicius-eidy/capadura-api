import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateBookUseCase } from "@/use-cases/_factories/books/make-create-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBookBodySchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = createBookBodySchema.parse(request.body);

        const createBookUseCase = makeCreateBookUseCase();
        const book = await createBookUseCase.execute({
            bookId,
        });

        reply.status(200).send(transformKeysToCamelCase(book));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOKS - Create]: ",
        });
    }
}
