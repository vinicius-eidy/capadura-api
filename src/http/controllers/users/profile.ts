import { makeGetUserProfileUseCase } from "@/use-cases/_factories/users/make-get-user-profile-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const getUserProfile = makeGetUserProfileUseCase();

    const { user } = await getUserProfile.execute({
        userId: request.user.sub,
    });

    return reply.status(200).send({
        ...transformKeysToCamelCase(user),
        passwordHash: undefined,
    });
}
