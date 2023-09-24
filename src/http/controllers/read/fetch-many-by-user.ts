import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByBookAndUserUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-book-and-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function fetchManyByUser(request: FastifyRequest, reply: FastifyReply) {
    const findManyByUserQuerySchema = z.object({
        userId: z.string(),
        status: z.enum(["ACTIVE", "FINISHED", "CANCELLED", "DELETED"]).optional(),
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { userId, status, page, perPage } = findManyByUserQuerySchema.parse(request.query);

        const fetchManyReadsByBookAndUserUseCase = makeFetchManyReadsByBookAndUserUseCase();
        const { items, total } = await fetchManyReadsByBookAndUserUseCase.execute({
            userId,
            status,
            page,
            perPage,
        });

        reply.status(200).send({
            items: transformKeysToCamelCase(items),
            total,
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
