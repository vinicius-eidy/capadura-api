import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFindLikeByBookAndUserUseCase } from "@/use-cases/_factories/likes/make-find-like-by-book-and-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function findByBookAndUser(request: FastifyRequest, reply: FastifyReply) {
    const findByBookAndUserParamsSchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = findByBookAndUserParamsSchema.parse(request.params);

        const findLikeByBookAndUserUseCase = makeFindLikeByBookAndUserUseCase();
        const like = await findLikeByBookAndUserUseCase.execute({
            bookId,
            userId: request.user.sub,
        });

        reply.status(200).send({
            like: transformKeysToCamelCase(like),
        });
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
