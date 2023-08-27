import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyUserFollowersUseCase } from "@/use-cases/_factories/follows/make-fetch-many-user-followers-use-case";

export async function fetchManyUserFollowers(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyUserFollowersQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    const fetchManyUserFollowersParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { page, perPage } = fetchManyUserFollowersQuerySchema.parse(request.query);
        const { userId } = fetchManyUserFollowersParamsSchema.parse(request.params);

        const fetchManyUserFollowersUseCase = makeFetchManyUserFollowersUseCase();
        const follows = await fetchManyUserFollowersUseCase.execute({
            userId,
            currentUserId: request.user.sub,
            page,
            perPage,
        });

        reply.status(200).send(transformKeysToCamelCase(follows));
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
