import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeUpdateFavoriteBookUseCase } from "@/use-cases/_factories/favorite-books/make-update-favorite-book-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateFavoriteBookBodySchema = z.object({
        favoriteBookId: z.string().uuid(),
        order: z.coerce
            .number()
            .refine((value) => [1, 2, 3, 4].includes(value), {
                message: "Order must be 1, 2, 3 or 4.",
            })
            .optional(),
        bookId: z.string(),
    });

    try {
        const { favoriteBookId, order, bookId } = updateFavoriteBookBodySchema.parse(request.body);

        const updateFavoriteBookUseCase = makeUpdateFavoriteBookUseCase();
        const updatedFavoriteBook = await updateFavoriteBookUseCase.execute({
            favoriteBookId,
            order,
            bookId,
            userId: request.user.sub,
        });

        reply.status(200).send(transformKeysToCamelCase(updatedFavoriteBook));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[FAVORITE BOOKS - Update favorite book]: ",
        });
    }
}
