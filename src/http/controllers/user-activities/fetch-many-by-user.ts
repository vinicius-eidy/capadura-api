import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { makeFetchManyUserActivitiesUseCase } from "@/use-cases/_factories/user-activities/make-fetch-many-user-activities-use-case";

export async function fetchManyByUser(request: FastifyRequest, reply: FastifyReply) {
    const fetchManyUserActivitiesQuerySchema = z.object({
        page: z.coerce.number().default(1),
        perPage: z.coerce.number().default(6),
    });

    const fetchManyUserActivitiesParamsSchema = z.object({
        userId: z.string(),
    });

    try {
        const { page, perPage } = fetchManyUserActivitiesQuerySchema.parse(request.query);
        const { userId } = fetchManyUserActivitiesParamsSchema.parse(request.params);

        const fetchManyUserActivitiesListUseCase = makeFetchManyUserActivitiesUseCase();
        const userActivities = await fetchManyUserActivitiesListUseCase.execute({
            userId,
            page,
            perPage,
        });

        reply.status(200).send(transformKeysToCamelCase(userActivities));
    } catch (err) {
        if (err instanceof Error) {
            reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
