import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

import { makeDeleteFavoriteBookUseCase } from "@/use-cases/_factories/favorite-books/make-delete-favorite-book-use-case";

export async function deleteFavoriteBook(request: FastifyRequest, reply: FastifyReply) {
    const deleteFavoriteBookParamsSchema = z.object({
        favoriteBookId: z.string().uuid(),
    });

    try {
        const { favoriteBookId } = deleteFavoriteBookParamsSchema.parse(request.params);

        const deleteFavoriteBookUseCase = makeDeleteFavoriteBookUseCase();
        await deleteFavoriteBookUseCase.execute({
            favoriteBookId,
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

        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
