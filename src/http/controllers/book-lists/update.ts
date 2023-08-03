import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

import { makeUpdateBookListUseCase } from "@/use-cases/_factories/booklists/make-update-booklist-use-case";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateBookListBodySchema = z.object({
        bookListId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        bookId: z.string().optional(),
    });

    try {
        const { bookListId, name, description, bookId } = updateBookListBodySchema.parse(
            request.body,
        );

        const updateBookListUseCase = makeUpdateBookListUseCase();
        await updateBookListUseCase.execute({
            bookListId,
            name,
            description,
            bookId,
            userId: request.user.sub,
        });

        reply.status(200).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            reply.status(404).send({ message: err.message });
        }

        if (err instanceof UnauthorizedError) {
            reply.status(401).send({ message: err.message });
        }

        throw err;
    }
}
