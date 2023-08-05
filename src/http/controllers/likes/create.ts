import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateLikeBookUseCase } from "@/use-cases/_factories/likes/make-create-like-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createLikeBookBodySchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = createLikeBookBodySchema.parse(request.body);

        const createLikeBookUseCase = makeCreateLikeBookUseCase();
        const like = await createLikeBookUseCase.execute({
            bookId,
            userId: request.user.sub,
        });

        reply.status(201).send({
            like: transformKeysToCamelCase(like),
        });
    } catch (err) {
        throw err;
    }
}
