import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetUserByUsernameUseCase } from "@/use-cases/_factories/users/make-get-user-by-username-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function findByUsername(request: FastifyRequest, reply: FastifyReply) {
    const getUserByUsernameParamsSchema = z.object({
        username: z.string(),
    });

    try {
        const { username } = getUserByUsernameParamsSchema.parse(request.params);

        const getUserByUsername = makeGetUserByUsernameUseCase();
        const { user } = await getUserByUsername.execute({
            username,
        });

        return reply.status(200).send({
            ...transformKeysToCamelCase(user),
            passwordHash: undefined,
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
