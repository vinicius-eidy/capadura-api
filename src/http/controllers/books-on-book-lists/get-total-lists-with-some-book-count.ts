import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetTotalListsWithSomeBookCountUseCase } from "@/use-cases/_factories/books-on-book-lists/make-get-total-lists-with-some-book-count-use-case";

export async function getTotalListsWithSomeBookCount(request: FastifyRequest, reply: FastifyReply) {
    const getTotalListsWithSomeBookCountParamsSchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = getTotalListsWithSomeBookCountParamsSchema.parse(request.params);

        const getTotalListsWithSomeBookCountUseCase = makeGetTotalListsWithSomeBookCountUseCase();
        const { total } = await getTotalListsWithSomeBookCountUseCase.execute({
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
