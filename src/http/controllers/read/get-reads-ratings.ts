import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetBookRatingsUseCase } from "@/use-cases/_factories/reads/make-get-book-ratings-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

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
            data: transformKeysToCamelCase(data),
            total,
            averageRating,
        });
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[READS - Get reads ratings]: ",
        });
    }
}
