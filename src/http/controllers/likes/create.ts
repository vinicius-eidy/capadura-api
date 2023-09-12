import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateLikeBookUseCase } from "@/use-cases/_factories/likes/make-create-like-book-use-case";
import { makeCreateUserActivityUseCase } from "@/use-cases/_factories/user-activities/make-create-user-activity-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createLikeBookBodySchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = createLikeBookBodySchema.parse(request.body);

        const createLikeBookUseCase = makeCreateLikeBookUseCase();
        const createLikeBookUseCasePromise = createLikeBookUseCase.execute({
            bookId,
            userId: request.user.sub,
        });

        const createUserActivityUseCase = makeCreateUserActivityUseCase();
        const createUserActivityUseCasePromise = createUserActivityUseCase.execute({
            activityType: "LIKE_BOOK",
            bookId,
            userId: request.user.sub,
        });

        const [like] = await Promise.all([
            createLikeBookUseCasePromise,
            createUserActivityUseCasePromise,
        ]);

        reply.status(201).send({
            like: transformKeysToCamelCase(like),
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
