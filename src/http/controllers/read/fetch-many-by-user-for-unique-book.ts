import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyReadsByUserForUniqueBookUseCase } from "@/use-cases/_factories/reads/make-fetch-many-reads-by-user-for-unique-book-use-case";

export async function fetchManyByUserForUniqueBook(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyByUserForUniqueBookBodySchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = fetchManyByUserForUniqueBookBodySchema.parse(request.params);

        const fetchManyReadsByUserForUniqueBookUseCase =
            makeFetchManyReadsByUserForUniqueBookUseCase();
        const { items, total } = await fetchManyReadsByUserForUniqueBookUseCase.execute({
            userId: request.user.sub,
            bookId,
        });

        reply.status(200).send({
            items: transformKeysToCamelCase(items),
            total,
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
