import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetBookRatingsUseCase } from "@/use-cases/factories/make-get-book-ratings-use-case";

export async function getBookRatings(request: FastifyRequest, reply: FastifyReply) {
    const getBookRatingsParamsSchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = getBookRatingsParamsSchema.parse(request.params);

        const getBookRatingsUseCase = makeGetBookRatingsUseCase();
        const { data, total, averageRating } = await getBookRatingsUseCase.execute({
            bookId,
        });

        reply.status(201).send({
            data,
            total,
            averageRating,
        });
    } catch (err) {
        throw err;
    }
}
