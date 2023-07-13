import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetUserByUsernameUseCase } from "@/use-cases/factories/make-get-user-by-username-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

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
            user: {
                ...user,
                password_hash: undefined,
            },
        });
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            reply.status(404).send({ message: err.message });
            return;
        }

        throw err;
    }
}
