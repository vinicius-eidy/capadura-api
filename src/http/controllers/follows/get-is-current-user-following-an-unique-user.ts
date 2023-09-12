import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetIsCurrentUserFollowingAnUniqueUserUseCase } from "@/use-cases/_factories/follows/make-get-is-current-user-following-an-unique-user-use-case";

export async function getIsCurrentUserFollowingAnUniqueUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const getIsCurrentUserFollowingAnUniqueUserParamsSchema = z.object({
        followingId: z.string(),
    });

    try {
        const { followingId } = getIsCurrentUserFollowingAnUniqueUserParamsSchema.parse(
            request.params,
        );

        const getIsCurrentUserFollowingAnUniqueUserUseCase =
            makeGetIsCurrentUserFollowingAnUniqueUserUseCase();
        const { isFollowing } = await getIsCurrentUserFollowingAnUniqueUserUseCase.execute({
            currentUserId: request.user.sub,
            followingId,
        });

        reply.status(200).send({
            isFollowing,
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
