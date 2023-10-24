import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUpdateProgressUseCase } from "@/use-cases/_factories/progress/make-update-progress-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateProgressBodySchema = z.object({
        id: z.string().uuid(),
        description: z.string().optional(),
        isSpoiler: z.boolean(),
    });

    try {
        const { id, description, isSpoiler } = updateProgressBodySchema.parse(request.body);

        const updateProgressUseCase = makeUpdateProgressUseCase();
        const { progress } = await updateProgressUseCase.execute({
            id,
            description,
            isSpoiler,
            userId: request.user.sub,
        });

        reply.status(200).send(transformKeysToCamelCase(progress));
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        if (err instanceof UnauthorizedError) {
            return reply.status(401).send({ message: err.message });
        }

        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
