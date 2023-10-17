import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteProgressUseCase } from "@/use-cases/_factories/progress/make-delete-progress-use-case";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

export async function deleteProgress(request: FastifyRequest, reply: FastifyReply) {
    const deleteProgressParamsSchema = z.object({
        progressId: z.string().uuid(),
    });

    try {
        const { progressId } = deleteProgressParamsSchema.parse(request.params);

        const deleteProgressUseCase = makeDeleteProgressUseCase();
        await deleteProgressUseCase.execute({
            progressId,
            userId: request.user.sub,
        });

        reply.status(204).send();
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
