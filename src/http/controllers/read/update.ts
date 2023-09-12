import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUpdateReadUseCase } from "@/use-cases/_factories/reads/make-update-read-use-case";
import { makeCreateUserActivityUseCase } from "@/use-cases/_factories/user-activities/make-create-user-activity-use-case";
import { activityTypeOptions } from "@/use-cases/create-user-activity-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateProgressBodySchema = z.object({
        bookId: z.string().optional(),
        readId: z.string().uuid(),
        status: z.enum(["ACTIVE", "FINISHED", "CANCELLED", "DELETED"]).optional(),
        isPrivate: z.boolean().optional(),
        reviewRating: z
            .number()
            .nonnegative()
            .max(5, "Review rating maximum value exceeded.")
            .optional(),
        reviewContent: z.string().optional(),
        reviewIsSpoiler: z.boolean().optional(),
        endRead: z.boolean().default(false),
    });

    try {
        const {
            bookId,
            readId,
            status,
            isPrivate,
            reviewRating,
            reviewContent,
            reviewIsSpoiler,
            endRead,
        } = updateProgressBodySchema.parse(request.body);

        const updateReadUseCase = makeUpdateReadUseCase();
        const read = await updateReadUseCase.execute({
            readId,
            status,
            isPrivate,
            reviewRating,
            reviewContent,
            reviewIsSpoiler,
            endRead,
            userId: request.user.sub,
        });

        const isCancelOrResumeRead = status === "CANCELLED" || status === "ACTIVE";

        if (bookId && (isCancelOrResumeRead || endRead)) {
            let activityType: activityTypeOptions = "ADD_BOOK_REVIEW";

            if (status === "CANCELLED") {
                activityType = "PAUSE_READ";
            } else if (status === "ACTIVE") {
                activityType = "RESUME_READ";
            }

            const createUserActivityUseCase = makeCreateUserActivityUseCase();
            await createUserActivityUseCase.execute({
                activity: reviewRating?.toString(),
                activityType,
                bookId,
                userId: request.user.sub,
            });
        }

        reply.status(200).send(transformKeysToCamelCase(read));
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        if (err instanceof UnauthorizedError) {
            return reply.status(401).send({ message: err.message });
        }

        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
