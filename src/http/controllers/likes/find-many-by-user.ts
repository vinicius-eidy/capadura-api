import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyLikesByUserUseCase } from "@/use-cases/_factories/likes/make-fetch-many-likes-by-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function findManyByUser(request: FastifyRequest, reply: FastifyReply) {
    const findManyByUserParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { userId } = findManyByUserParamsSchema.parse(request.params);

        const findLikeByBookAndUserUseCase = makeFetchManyLikesByUserUseCase();
        const { likes } = await findLikeByBookAndUserUseCase.execute({
            userId,
        });

        reply.status(200).send(transformKeysToCamelCase(likes));
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
