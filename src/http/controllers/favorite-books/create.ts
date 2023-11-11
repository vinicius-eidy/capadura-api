import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateFavoriteBookUseCase } from "@/use-cases/_factories/favorite-books/make-create-favorite-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createFavoriteBookBodySchema = z.object({
        order: z.coerce.number().refine((value) => [1, 2, 3, 4].includes(value), {
            message: "Order must be 1, 2, 3 or 4.",
        }),
        bookId: z.string(),
    });

    try {
        const { order, bookId } = createFavoriteBookBodySchema.parse(request.body);

        const createFavoriteBookUseCase = makeCreateFavoriteBookUseCase();
        const favoriteBook = await createFavoriteBookUseCase.execute({
            order,
            bookId,
            userId: request.user.sub,
        });

        reply.status(201).send(transformKeysToCamelCase(favoriteBook));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[FAVORITE BOOKS - Create]: ",
        });
    }
}
