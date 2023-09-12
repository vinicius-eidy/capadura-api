import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateProgressUseCase } from "@/use-cases/_factories/progress/make-create-progress-use-case";
import { makeCreateUserActivityUseCase } from "@/use-cases/_factories/user-activities/make-create-user-activity-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createProgressBodySchema = z.object({
        bookId: z.string(),
        readId: z.string(),
        description: z.string().optional(),
        isSpoiler: z.boolean(),
        pagesCount: z.coerce.number(),
        countType: z.enum(["page", "percentage"]).default("page"),
        bookPageCount: z.coerce.number(),
    });

    try {
        const { bookId, readId, description, isSpoiler, pagesCount, countType, bookPageCount } =
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
        const createProgressUseCasePromise = createProgressUseCase.execute({
            readId,
            description,
            isSpoiler,
            page,
            percentage: percentage,
            userId: request.user.sub,
        });

        const createUserActivityUseCase = makeCreateUserActivityUseCase();
        const createUserActivityUseCasePromise = createUserActivityUseCase.execute({
            activity: percentage.toString(),
            activityType: "ADD_BOOK_PROGRESS",
            bookId,
            userId: request.user.sub,
        });

        const [progress] = await Promise.all([
            createProgressUseCasePromise,
            createUserActivityUseCasePromise,
        ]);

        reply.status(201).send(transformKeysToCamelCase(progress));
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
