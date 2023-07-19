import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateUserBodySchema = z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        description: z.string().optional(),
        location: z.string().max(40, { message: "Máximo 40 caracteres." }).optional(),
        website: z.string().url({ message: "URL inválida." }).optional(),
        twitter: z.string().optional(),
    });

    try {
        const { id, name, username, email, description, location, website, twitter } =
            updateUserBodySchema.parse(request.body);

        const updateUserUseCase = makeUpdateUserUseCase();

        const user = await updateUserUseCase.execute({
            id,
            name,
            username,
            email,
            description,
            location,
            website,
            twitter,
        });

        return reply.status(200).send({
            user: {
                ...user,
                passwordHash: undefined,
            },
        });
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        throw err;
    }
}
