import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyProgressByUserUseCase } from "@/use-cases/factories/make-fetch-many-progress-by-user-use-case";

export async function findManyByUser(request: FastifyRequest, reply: FastifyReply) {
    const findManyByUserParamsSchema = z.object({
        userId: z.string(),
    });
    const findManyByUserQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { userId } = findManyByUserParamsSchema.parse(request.params);
        const { page, perPage } = findManyByUserQuerySchema.parse(request.query);

        const fetchManyProgressByUserUseCase = makeFetchManyProgressByUserUseCase();
        const { items, total } = await fetchManyProgressByUserUseCase.execute({
            userId,
            page,
            perPage,
        });

        reply.status(200).send({
            items,
            total,
        });
    } catch (err) {
        throw err;
    }
}
