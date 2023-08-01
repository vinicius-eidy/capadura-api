import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user-use-case";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateUserBodySchema = z.object({
        id: z.string(),
        name: z
            .string()
            .min(1, { message: "Campo obrigatório." })
            .max(50, { message: "Máximo 50 caracteres." }),
        username: z
            .string()
            .min(1, { message: "Campo obrigatório." })
            .max(50, { message: "Minimo 50 caracteres." }),
        email: z.string().email(),
        description: z.string().optional(),
        favoriteBooks: z.string().array().optional(),
        location: z.string().max(50, { message: "Máximo 50 caracteres." }).optional(),
        website: z.union([z.literal(""), z.string().trim().url()]).optional(),
        twitter: z.string().optional(),
    });

    try {
        const {
            id,
            name,
            username,
            email,
            description,
            favoriteBooks,
            location,
            website,
            twitter,
        } = updateUserBodySchema.parse(request.body);

        const updateUserUseCase = makeUpdateUserUseCase();

        const user = await updateUserUseCase.execute({
            id,
            name,
            username,
            email,
            description,
            favoriteBooks,
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
