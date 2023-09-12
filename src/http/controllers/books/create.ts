import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateBookUseCase } from "@/use-cases/_factories/books/make-create-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBookBodySchema = z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        authors: z.string().array(),
        publisher: z.string().optional(),
        publishDate: z.string().datetime().optional(),
        language: z.string().optional(),
        pageCount: z.coerce.number().optional(),
        description: z.string().optional(),
        imageLink: z.string().url().optional(),
    });

    try {
        const {
            id,
            title,
            subtitle,
            authors,
            publisher,
            publishDate,
            language,
            pageCount,
            description,
            imageLink,
        } = createBookBodySchema.parse(request.body);

        const createBookUseCase = makeCreateBookUseCase();
        const book = await createBookUseCase.execute({
            id,
            title,
            subtitle,
            authors,
            publisher,
            publishDate,
            language,
            pageCount,
            description,
            imageLink,
        });

        reply.status(200).send(transformKeysToCamelCase(book));
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
