import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateBookListUseCase } from "@/use-cases/_factories/book-lists/make-create-book-list-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

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

        reply.status(201).send(transformKeysToCamelCase(bookList));
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
