import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateLikeBookUseCase } from "@/use-cases/factories/make-create-like-book-use-case";

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
            like,
        });
    } catch (err) {
        throw err;
    }
}
