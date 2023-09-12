import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeUpdateFavoriteBookUseCase } from "@/use-cases/_factories/favorite-books/make-update-favorite-book-use-case";

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
