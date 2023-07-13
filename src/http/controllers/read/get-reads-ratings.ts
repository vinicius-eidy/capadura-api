import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetBookRatingsUseCase } from "@/use-cases/factories/make-get-book-ratings-use-case";

export async function getReadsRatings(request: FastifyRequest, reply: FastifyReply) {
    const getBookRatingsParamsSchema = z.object({
        bookId: z.string().optional(),
        userId: z.string().optional(),
    });

    try {
        const { bookId, userId } = getBookRatingsParamsSchema.parse(request.query);

        const getBookRatingsUseCase = makeGetBookRatingsUseCase();
        const { data, total, averageRating } = await getBookRatingsUseCase.execute({
            bookId,
            userId,
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