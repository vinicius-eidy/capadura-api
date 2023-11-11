import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteLikeBookUseCase } from "@/use-cases/_factories/likes/make-delete-like-book-use-case";

import { buildErrorMessage } from "@/utils/build-error-message";

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const deleteLikeBookParamsSchema = z.object({
        likeId: z.string().uuid(),
    });

    try {
        const { likeId } = deleteLikeBookParamsSchema.parse(request.params);

        const deleteLikeBookUseCase = makeDeleteLikeBookUseCase();
        await deleteLikeBookUseCase.execute({
            likeId,
            userId: request.user.sub,
        });

        reply.status(204).send();
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[LIKES - Delete]: ",
        });
    }
}
