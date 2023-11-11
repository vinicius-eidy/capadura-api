import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetIsCurrentUserFollowingAnUniqueUserUseCase } from "@/use-cases/_factories/follows/make-get-is-current-user-following-an-unique-user-use-case";

import { buildErrorMessage } from "@/utils/build-error-message";

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
        buildErrorMessage({
            err,
            prefix: "[FOLLOWS - Get is current user following an unique user]: ",
        });
    }
}
