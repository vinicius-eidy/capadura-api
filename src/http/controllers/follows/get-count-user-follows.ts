import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetCountUserFollowsUseCase } from "@/use-cases/_factories/follows/make-get-count-user-follows-use-case";

export async function getCountUserFollows(request: FastifyRequest, reply: FastifyReply) {
    const getCountUserFollowsParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { userId } = getCountUserFollowsParamsSchema.parse(request.params);

        const getCountUserFollowsUseCase = makeGetCountUserFollowsUseCase();
        const { followers, following } = await getCountUserFollowsUseCase.execute({
            userId,
        });

        reply.status(200).send({
            followers,
            following,
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
