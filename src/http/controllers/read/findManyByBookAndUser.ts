import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByBookAndUserUseCase } from "@/use-cases/factories/make-fetch-many-reads-by-book-and-user-use-case";

export async function findManyByBookByUser(request: FastifyRequest, reply: FastifyReply) {
    const findManyByBookByUserParamsSchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = findManyByBookByUserParamsSchema.parse(request.params);

        const fetchManyReadsByBookAndUserUseCase = makeFetchManyReadsByBookAndUserUseCase();
        const reads = await fetchManyReadsByBookAndUserUseCase.execute({
            userId: request.user.sub,
            bookId,
        });

        reply.status(200).send(reads);
    } catch (err) {
        throw err;
    }
}
