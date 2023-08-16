import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateFavoriteBookUseCase } from "@/use-cases/_factories/favorite-books/make-create-favorite-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createFavoriteBookBodySchema = z.object({
        order: z.coerce.number(),
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
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
