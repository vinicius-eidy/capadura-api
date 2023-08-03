import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateProgressUseCase } from "@/use-cases/_factories/progress/make-create-progress-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createProgressBodySchema = z.object({
        readId: z.string(),
        description: z.string().optional(),
        isSpoiler: z.boolean(),
        pagesCount: z.coerce.number(),
        countType: z.enum(["page", "percentage"]).default("page"),
        bookPageCount: z.coerce.number(),
    });

    try {
        const { readId, description, isSpoiler, pagesCount, countType, bookPageCount } =
            createProgressBodySchema.parse(request.body);

        let page = 0;
        let percentage = 0;

        if (countType === "page") {
            page = Math.round(pagesCount);
            percentage = Math.round((pagesCount / bookPageCount) * 100);
        }

        if (countType === "percentage") {
            page = Math.round((bookPageCount / 100) * pagesCount);
            percentage = Math.round(pagesCount);
        }

        if (percentage >= 100) {
            page = bookPageCount;
            percentage = 100;
        }

        const createProgressUseCase = makeCreateProgressUseCase();
        const progress = await createProgressUseCase.execute({
            readId,
            description,
            isSpoiler,
            page,
            percentage: percentage,
            userId: request.user.sub,
        });

        reply.status(201).send(progress);
    } catch (err) {
        throw err;
    }
}
