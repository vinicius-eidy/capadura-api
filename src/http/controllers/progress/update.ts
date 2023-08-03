import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUpdateProgressUseCase } from "@/use-cases/_factories/progress/make-update-progress-use-case";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateProgressBodySchema = z.object({
        id: z.string().uuid(),
        description: z.string().optional(),
        isSpoiler: z.boolean(),
        pagesCount: z.coerce.number(),
        countType: z.enum(["page", "percentage"]).default("page"),
        bookPageCount: z.coerce.number(),
    });

    try {
        const { id, description, isSpoiler, pagesCount, countType, bookPageCount } =
            updateProgressBodySchema.parse(request.body);

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

        const updateProgressUseCase = makeUpdateProgressUseCase();
        const progress = await updateProgressUseCase.execute({
            id,
            description,
            isSpoiler,
            page,
            percentage: percentage,
        });

        reply.status(200).send(progress);
    } catch (err) {
        throw err;
    }
}
