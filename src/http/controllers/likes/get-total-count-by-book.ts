import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetTotalLikeCountByBookUseCase } from "@/use-cases/_factories/likes/make-get-total-like-count-by-book-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function getTotalCountByBook(request: FastifyRequest, reply: FastifyReply) {
    const getTotalCountByParamsSchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = getTotalCountByParamsSchema.parse(request.params);

        const getTotalLikeCountByBookUseCase = makeGetTotalLikeCountByBookUseCase();
        const { total } = await getTotalLikeCountByBookUseCase.execute({
            bookId,
        });

        reply.status(200).send({
            total,
        });
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[LIKES - Get total count by book]: ",
        });
    }
}
