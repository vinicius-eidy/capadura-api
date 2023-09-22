import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateBookUseCase } from "@/use-cases/_factories/books/make-create-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

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
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
