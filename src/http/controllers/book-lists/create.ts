import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateBookListUseCase } from "@/use-cases/_factories/book-lists/make-create-book-list-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBookListBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
    });

    try {
        const { name, description } = createBookListBodySchema.parse(request.body);

        const createBookListUseCase = makeCreateBookListUseCase();
        const bookList = await createBookListUseCase.execute({
            name,
            description,
            userId: request.user.sub,
        });

        reply.status(201).send(bookList);
    } catch (err) {
        throw err;
    }
}
