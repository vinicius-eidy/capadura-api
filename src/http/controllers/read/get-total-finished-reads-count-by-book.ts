import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetTotalFinishedReadsCountByBookUseCase } from "@/use-cases/_factories/reads/make-get-total-finished-reads-count-by-book-use-case";

export async function getTotalFinishedReadsCountByBook(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const getTotalFinishedReadsCountByBookParamsSchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = getTotalFinishedReadsCountByBookParamsSchema.parse(request.params);

        const getTotalFinishedReadsCountByBookUseCase =
            makeGetTotalFinishedReadsCountByBookUseCase();
        const { total } = await getTotalFinishedReadsCountByBookUseCase.execute({
            bookId,
        });

        reply.status(201).send({
            total,
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
