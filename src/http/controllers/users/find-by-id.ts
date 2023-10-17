import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetUserByIdUseCase } from "@/use-cases/_factories/users/make-get-user-by-id-use-case copy";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
    const getUserByIdParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { userId } = getUserByIdParamsSchema.parse(request.params);

        const getUserById = makeGetUserByIdUseCase();
        const { user } = await getUserById.execute({
            userId,
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
