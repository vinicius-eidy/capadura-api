import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateReadUseCase } from "@/use-cases/_factories/reads/make-create-read-use-case";
import { makeCreateUserActivityUseCase } from "@/use-cases/_factories/user-activities/make-create-user-activity-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createReadBodySchema = z.object({
        bookId: z.string(),
    });

    try {
        const { bookId } = createReadBodySchema.parse(request.body);

        const createReadUseCase = makeCreateReadUseCase();
        const createReadUseCasePromise = createReadUseCase.execute({
            bookId,
            userId: request.user.sub,
        });

        const createUserActivityUseCase = makeCreateUserActivityUseCase();
        const createUserActivityUseCasePromise = createUserActivityUseCase.execute({
            activityType: "START_READ",
            bookId,
            userId: request.user.sub,
        });

        const [read] = await Promise.all([
            createReadUseCasePromise,
            createUserActivityUseCasePromise,
        ]);

        reply.status(201).send(transformKeysToCamelCase(read));
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
