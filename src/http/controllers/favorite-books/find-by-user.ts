import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyFavoriteBooksByUserUseCase } from "@/use-cases/_factories/favorite-books/make-fetch-many-favorite-books-by-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function findByUser(request: FastifyRequest, reply: FastifyReply) {
    const fetchFavoriteBooksByUserParamsSchema = z.object({
        username: z.string(),
    });

    try {
        const { username } = fetchFavoriteBooksByUserParamsSchema.parse(request.params);

        const fetchManyFavoriteBooksByUserUseCase = makeFetchManyFavoriteBooksByUserUseCase();
        const favoriteBooks = await fetchManyFavoriteBooksByUserUseCase.execute({
            username,
        });

        reply.status(200).send(transformKeysToCamelCase(favoriteBooks));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[FAVORITE BOOKS - Find by user]: ",
        });
    }
}
