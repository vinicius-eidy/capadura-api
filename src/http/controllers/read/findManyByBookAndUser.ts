import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByBookAndUserUseCase } from "@/use-cases/factories/make-fetch-many-reads-by-book-and-user-use-case";

export async function findManyByBookByUser(request: FastifyRequest, reply: FastifyReply) {
    const findManyByBookByUserParamsSchema = z.object({
        bookId: z.string(),
    });

    const findManyByBookByUserQuerySchema = z.object({
        page: z.coerce.number(),
    });

    try {
        const { bookId } = findManyByBookByUserParamsSchema.parse(request.params);
        const { page } = findManyByBookByUserQuerySchema.parse(request.query);

        const fetchManyReadsByBookAndUserUseCase = makeFetchManyReadsByBookAndUserUseCase();
        const { items, total } = await fetchManyReadsByBookAndUserUseCase.execute({
            userId: request.user.sub,
            bookId,
            page,
        });

        reply.status(200).send({
            items,
            total,
        });
    } catch (err) {
        throw err;
    }
}
