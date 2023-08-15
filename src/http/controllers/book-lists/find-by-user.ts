import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchBookListsByUserUseCase } from "@/use-cases/_factories/book-lists/make-fetch-book-lists-by-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function findByUser(request: FastifyRequest, reply: FastifyReply) {
    const fetchBookListsByUserParamsSchema = z.object({
        userId: z.string(),
    });

    const fetchBookListsByUserQuerySchema = z.object({
        q: z.string().default(""),
        bookId: z.string().optional(),
    });

    try {
        const { userId } = fetchBookListsByUserParamsSchema.parse(request.params);
        const { q, bookId } = fetchBookListsByUserQuerySchema.parse(request.query);

        const fetchBookListsByUserUseCase = makeFetchBookListsByUserUseCase();
        const bookList = await fetchBookListsByUserUseCase.execute({
            userId,
            q,
            bookId,
        });

        reply.status(201).send(transformKeysToCamelCase(bookList));
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
