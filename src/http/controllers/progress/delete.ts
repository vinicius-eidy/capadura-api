import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteProgressUseCase } from "@/use-cases/_factories/progress/make-delete-progress-use-case";

import { buildErrorMessage } from "@/utils/build-error-message";

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
        buildErrorMessage({
            err,
            prefix: "[PROGRESS - Delete]: ",
        });
    }
}
