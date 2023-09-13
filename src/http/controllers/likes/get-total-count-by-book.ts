import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetTotalLikeCountByBookUseCase } from "@/use-cases/_factories/likes/make-get-total-like-count-by-book-use-case";

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
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
