import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteBookListUseCase } from "@/use-cases/factories/make-delete-booklist-use-case";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

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
        if (err instanceof ResourceNotFoundError) {
            reply.status(404).send({ message: err.message });
        }

        if (err instanceof UnauthorizedError) {
            reply.status(401).send({ message: err.message });
        }

        throw err;
    }
}
