import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUpdateReadUseCase } from "@/use-cases/factories/make-update-read-use-case";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateProgressBodySchema = z.object({
        readId: z.string().uuid(),
        status: z.enum(["ACTIVE", "FINISHED", "CANCELLED", "DELETED"]).optional(),
        isPrivate: z.boolean().optional(),
    });

    try {
        const { readId, status, isPrivate } = updateProgressBodySchema.parse(request.body);

        const updateReadUseCase = makeUpdateReadUseCase();
        const read = await updateReadUseCase.execute({
            readId,
            status,
            isPrivate,
        });

        reply.status(200).send(read);
    } catch (err) {
        throw err;
    }
}
