import { FastifyRequest, FastifyReply } from "fastify";

import { makeGetUserProfileUseCase } from "@/use-cases/_factories/users/make-get-user-profile-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getUserProfile = makeGetUserProfileUseCase();
        const { user } = await getUserProfile.execute({
            userId: request.user.sub,
        });

        return reply.status(200).send({
            ...transformKeysToCamelCase(user),
            passwordHash: undefined,
        });
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[USERS - Profile]: ",
        });
    }
}
