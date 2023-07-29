import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteLikeBookUseCase } from "@/use-cases/factories/make-delete-like-book-use-case";

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const deleteLikeBookParamsSchema = z.object({
        likeId: z.string().uuid(),
    });

    try {
        const { likeId } = deleteLikeBookParamsSchema.parse(request.params);

        const deleteLikeBookUseCase = makeDeleteLikeBookUseCase();
        await deleteLikeBookUseCase.execute({
            likeId,
        });

        reply.status(204).send();
    } catch (err) {
        throw err;
    }
}
