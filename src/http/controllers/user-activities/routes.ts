import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { fetchManyByUser } from "./fetch-many-by-user";

export async function userActivitiesRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/user-activities/:userId", fetchManyByUser);
}
