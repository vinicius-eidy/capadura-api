import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetPagesReadedByDayUseCase } from "@/use-cases/_factories/progress/make-get-pages-readed-by-day-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function getPagesReadedByDay(request: FastifyRequest, reply: FastifyReply) {
    const getPagesReadedByDayParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { userId } = getPagesReadedByDayParamsSchema.parse(request.params);

        const getPagesReadedByDayUseCase = makeGetPagesReadedByDayUseCase();
        const { data } = await getPagesReadedByDayUseCase.execute({
            userId,
        });

        reply.status(200).send(transformKeysToCamelCase(data));
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
