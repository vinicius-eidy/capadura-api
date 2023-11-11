import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteBookOnBookListUseCase } from "@/use-cases/_factories/books-on-book-lists/make-delete-book-on-book-list-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function deleteBookOnBookList(request: FastifyRequest, reply: FastifyReply) {
    const deleteBookOnBookListParamsSchema = z.object({
        bookOnBookListId: z.string().uuid(),
    });

    try {
        const { bookOnBookListId } = deleteBookOnBookListParamsSchema.parse(request.params);

        const deleteBookOnBookListUseCase = makeDeleteBookOnBookListUseCase();
        await deleteBookOnBookListUseCase.execute({
            bookOnBookListId,
            userId: request.user.sub,
        });

        reply.status(204).send();
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOKS ON BOOK LIST - Delete]: ",
        });
    }
}
