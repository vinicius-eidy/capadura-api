import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteReadUseCase } from "@/use-cases/_factories/reads/make-delete-read-use-case";

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
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
