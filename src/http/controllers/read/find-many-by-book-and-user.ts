import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByBookAndUserUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-book-and-user-use-case";

export async function findManyByUser(request: FastifyRequest, reply: FastifyReply) {
    const findManyByUserQuerySchema = z.object({
        userId: z.string().optional(),
        bookId: z.string().optional(),
        status: z.enum(["ACTIVE", "FINISHED", "CANCELLED", "DELETED"]).optional(),
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { userId, bookId, status, page, perPage } = findManyByUserQuerySchema.parse(
            request.query,
        );

        const fetchManyReadsByBookAndUserUseCase = makeFetchManyReadsByBookAndUserUseCase();
        const { items, total } = await fetchManyReadsByBookAndUserUseCase.execute({
            userId: userId ?? request.user.sub,
            bookId,
            status,
            page,
            perPage,
        });

        reply.status(200).send({ items, total });
    } catch (err) {
        throw err;
    }
}
