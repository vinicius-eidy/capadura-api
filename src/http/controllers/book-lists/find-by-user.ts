import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchBookListsByUserUseCase } from "@/use-cases/_factories/book-lists/make-fetch-book-lists-by-user-use-case";

export async function findByUser(request: FastifyRequest, reply: FastifyReply) {
    const fetchBookListsByUserParamsSchema = z.object({
        userId: z.string(),
    });

    const fetchBookListsByUserQuerySchema = z.object({
        q: z.string().default(""),
    });

    try {
        const { userId } = fetchBookListsByUserParamsSchema.parse(request.params);
        const { q } = fetchBookListsByUserQuerySchema.parse(request.query);

        const fetchBookListsByUserUseCase = makeFetchBookListsByUserUseCase();
        const bookList = await fetchBookListsByUserUseCase.execute({
            userId,
            q,
        });

        reply.status(201).send(bookList);
    } catch (err) {
        throw err;
    }
}
