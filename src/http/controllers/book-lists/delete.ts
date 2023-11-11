import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteBookListUseCase } from "@/use-cases/_factories/book-lists/make-delete-book-list-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function deleteBookList(request: FastifyRequest, reply: FastifyReply) {
    const deleteBookListParamsSchema = z.object({
        bookListId: z.string().uuid(),
    });

    try {
        const { bookListId } = deleteBookListParamsSchema.parse(request.params);

        const deleteBookListUseCase = makeDeleteBookListUseCase();
        await deleteBookListUseCase.execute({
            bookListId,
            userId: request.user.sub,
        });

        reply.status(204).send();
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOK LISTS - Delete]: ",
        });
    }
}
