import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFindUniqueReadUseCase } from "@/use-cases/_factories/reads/make-find-unique-read-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function findUnique(request: FastifyRequest, reply: FastifyReply) {
    const createReadParamsSchema = z.object({
        readId: z.string(),
    });

    try {
        const { readId } = createReadParamsSchema.parse(request.params);

        const findUniqueReadUseCase = makeFindUniqueReadUseCase();
        const { read } = await findUniqueReadUseCase.execute({
            readId,
        });

        reply.status(200).send(transformKeysToCamelCase(read));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[READS - Find unique]: ",
        });
    }
}
