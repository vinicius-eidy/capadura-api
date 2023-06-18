import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetBookUseCase } from "@/use-cases/factories/make-get-book-use-case";

export async function findUnique(request: FastifyRequest, reply: FastifyReply) {
    const findUniqueBookParamsSchema = z.object({
        id: z.string(),
    });

    try {
        const { id } = findUniqueBookParamsSchema.parse(request.params);

        const getBookUseCase = makeGetBookUseCase();
        const book = await getBookUseCase.execute({ id });

        reply.status(200).send(book);
    } catch (err) {
        throw err;
    }
}
