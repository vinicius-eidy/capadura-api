import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateProgressUseCase } from "@/use-cases/factories/make-create-progress-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createReadBodySchema = z.object({
        readId: z.string(),
        description: z.string().optional(),
        is_spoiler: z.boolean(),
        page: z.coerce.number().optional(),
        percentage: z.coerce.number().optional(),
    });

    try {
        const { readId, description, is_spoiler, page, percentage } = createReadBodySchema.parse(
            request.body,
        );

        const createProgressUseCase = makeCreateProgressUseCase();
        const progress = await createProgressUseCase.execute({
            readId,
            description,
            is_spoiler,
            page,
            percentage,
        });

        reply.status(201).send(progress);
    } catch (err) {
        throw err;
    }
}
