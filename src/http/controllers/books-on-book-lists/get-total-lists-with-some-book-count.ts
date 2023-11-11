import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetTotalListsWithSomeBookCountUseCase } from "@/use-cases/_factories/books-on-book-lists/make-get-total-lists-with-some-book-count-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

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
        buildErrorMessage({
            err,
            prefix: "[BOOKS ON BOOK LIST - Get total lists with some book count]: ",
        });
    }
}
