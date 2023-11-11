import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetCountUserFollowsUseCase } from "@/use-cases/_factories/follows/make-get-count-user-follows-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

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
        buildErrorMessage({
            err,
            prefix: "[FOLLOWS - Get count user follows]: ",
        });
    }
}
