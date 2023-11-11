import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteFavoriteBookUseCase } from "@/use-cases/_factories/favorite-books/make-delete-favorite-book-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

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
        buildErrorMessage({
            err,
            prefix: "[FAVORITE BOOKS - Delete]: ",
        });
    }
}
