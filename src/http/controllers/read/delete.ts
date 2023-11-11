import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteReadUseCase } from "@/use-cases/_factories/reads/make-delete-read-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function deleteRead(request: FastifyRequest, reply: FastifyReply) {
    const deleteReadParamsSchema = z.object({
        readId: z.string().uuid(),
    });

    try {
        const { readId } = deleteReadParamsSchema.parse(request.params);

        const deleteReadUseCase = makeDeleteReadUseCase();
        await deleteReadUseCase.execute({
            readId,
            userId: request.user.sub,
        });

        reply.status(204).send();
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[READS - Delete]: ",
        });
    }
}
