import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

import { makeDeleteBookOnBookListUseCase } from "@/use-cases/_factories/books-on-book-lists/make-delete-book-on-book-list-use-case";

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
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        if (err instanceof UnauthorizedError) {
            return reply.status(401).send({ message: err.message });
        }

        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
