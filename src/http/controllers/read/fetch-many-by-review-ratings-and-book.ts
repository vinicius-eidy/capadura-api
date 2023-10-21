import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyReadsByReviewRatingsAndBookUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-review-ratings-and-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function fetchManyByReviewRatingsAndBook(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const fetchManyReadsByReviewRatingsAndBookParamsSchema = z.object({
        bookId: z.string(),
        rating: z.enum(["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"]),
    });

    const fetchManyReadsByReviewRatingsAndBookQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { bookId, rating } = fetchManyReadsByReviewRatingsAndBookParamsSchema.parse(
            request.params,
        );
        const { page, perPage } = fetchManyReadsByReviewRatingsAndBookQuerySchema.parse(
            request.query,
        );

        const fetchManyReadsByReviewRatingsAndBookUseCase =
            makeFetchManyReadsByReviewRatingsAndBookUseCase();
        const { items, total } = await fetchManyReadsByReviewRatingsAndBookUseCase.execute({
            rating: Number(rating) as 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
            bookId,
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
