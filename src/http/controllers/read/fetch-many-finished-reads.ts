import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchManyFinishedReadsUseCase } from "@/use-cases/_factories/reads/make-fetch-many-finished-reads-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function fetchManyFinishedReads(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyFinishedReadsQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(20),
    });

    try {
        const { page, perPage } = fetchManyFinishedReadsQuerySchema.parse(request.query);

        const fetchManyFinishedReadsUseCase = makeFetchManyFinishedReadsUseCase();
        const { items, total } = await fetchManyFinishedReadsUseCase.execute({
            page,
            perPage,
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
