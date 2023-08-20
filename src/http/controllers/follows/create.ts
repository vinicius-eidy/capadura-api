import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeCreateFollowUseCase } from "@/use-cases/_factories/follows/make-create-follow-use-case";
import { IsNotAllowedToFollowYourself } from "@/use-cases/_errors/is-not-allowed-to-follow-yourself";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createFollowBodySchema = z.object({
        followerId: z.string(),
        followingId: z.string(),
    });

    try {
        const { followerId, followingId } = createFollowBodySchema.parse(request.body);

        const createFollowUseCase = makeCreateFollowUseCase();
        const follows = await createFollowUseCase.execute({
            followerId,
            followingId,
        });

        reply.status(200).send(transformKeysToCamelCase(follows));
    } catch (err) {
        if (err instanceof IsNotAllowedToFollowYourself) {
            reply.status(400).send({ message: err.message });
        }

        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
