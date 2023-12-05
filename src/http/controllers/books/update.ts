import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUpdateBookUseCase } from "@/use-cases/_factories/books/make-update-book-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateBookParamsSchema = z.object({
        id: z.string(),
    });

    const updateBookBodySchema = z.object({
        subtitle: z.string().optional(),
        authors: z.string().array().optional(),
        publisher: z.string().optional(),
        publishDate: z.string().datetime().optional(),
        language: z.string().optional(),
        pageCount: z.coerce.number().optional(),
        description: z.string().optional(),
        imageLink: z.string().url().optional(),
    });

    try {
        const { id } = updateBookParamsSchema.parse(request.params);

        const {
            subtitle,
            authors,
            publisher,
            publishDate,
            language,
            pageCount,
            description,
            imageLink,
        } = updateBookBodySchema.parse(request.body);

        const updateBookUseCase = makeUpdateBookUseCase();
        const book = await updateBookUseCase.execute({
            id,
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
        buildErrorMessage({
            err,
            prefix: "[BOOKS - Update]: ",
        });
    }
}
