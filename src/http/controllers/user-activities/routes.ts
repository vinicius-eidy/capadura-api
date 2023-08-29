import { FastifyInstance } from "fastify";

import { fetchManyByUser } from "./fetch-many-by-user";

export async function userActivitiesRoutes(app: FastifyInstance) {
    app.get("/user-activities/:userId", fetchManyByUser);
}
