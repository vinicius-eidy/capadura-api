import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByReviewRatingsAndUserUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-review-ratings-and-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function fetchManyByReviewRatingsAndUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const fetchManyReadsByReviewRatingsAndUserParamsSchema = z.object({
        userId: z.string(),
        rating: z.enum(["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"]),
    });

    const fetchManyReadsByReviewRatingsAndUserQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { userId, rating } = fetchManyReadsByReviewRatingsAndUserParamsSchema.parse(
            request.params,
        );
        const { page, perPage } = fetchManyReadsByReviewRatingsAndUserQuerySchema.parse(
            request.query,
        );

        const fetchManyReadsByReviewRatingsAndUserUseCase =
            makeFetchManyReadsByReviewRatingsAndUserUseCase();
        const { items, total } = await fetchManyReadsByReviewRatingsAndUserUseCase.execute({
            rating: Number(rating) as 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
            userId,
            page,
            perPage,
        });

        reply.status(200).send(
            transformKeysToCamelCase({
                items,
                total,
            }),
        );
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
