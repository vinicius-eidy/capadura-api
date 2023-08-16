import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyFavoriteBooksByUserUseCase } from "@/use-cases/_factories/favorite-books/make-fetch-many-favorite-books-by-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function findByUser(request: FastifyRequest, reply: FastifyReply) {
    const fetchFavoriteBooksByUserParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { userId } = fetchFavoriteBooksByUserParamsSchema.parse(request.params);

        const fetchManyFavoriteBooksByUserUseCase = makeFetchManyFavoriteBooksByUserUseCase();
        const favoriteBooks = await fetchManyFavoriteBooksByUserUseCase.execute({
            userId,
        });

        reply.status(201).send(transformKeysToCamelCase(favoriteBooks));
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
