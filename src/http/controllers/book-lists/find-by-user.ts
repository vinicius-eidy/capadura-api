import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchBookListsByUserUseCase } from "@/use-cases/factories/make-fetch-booklists-by-user-use-case";

export async function findByUser(request: FastifyRequest, reply: FastifyReply) {
    const fetchBookListsByUserParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { userId } = fetchBookListsByUserParamsSchema.parse(request.params);

        const fetchBookListsByUserUseCase = makeFetchBookListsByUserUseCase();
        const bookList = await fetchBookListsByUserUseCase.execute({
            userId,
        });

        reply.status(201).send(bookList);
    } catch (err) {
        throw err;
    }
}
