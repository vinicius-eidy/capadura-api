import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyUserFollowingUseCase } from "@/use-cases/_factories/follows/make-fetch-many-user-following-use-case";

export async function fetchManyUserFollowing(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyUserFollowingQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    const fetchManyUserFollowingParamsSchema = z.object({
        userId: z.string(),
        currentUserId: z.string().optional(),
    });

    try {
        const { page, perPage } = fetchManyUserFollowingQuerySchema.parse(request.query);
        const { userId, currentUserId } = fetchManyUserFollowingParamsSchema.parse(request.params);

        const fetchManyUserFollowingUseCase = makeFetchManyUserFollowingUseCase();
        const follows = await fetchManyUserFollowingUseCase.execute({
            userId,
            currentUserId,
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
