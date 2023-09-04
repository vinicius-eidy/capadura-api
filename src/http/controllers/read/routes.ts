import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { update } from "./update";
import { findManyByUser } from "./find-many-by-book-and-user";
import { getReadsRatings } from "./get-reads-ratings";

export async function readRoutes(app: FastifyInstance) {
    app.post("/read", { onRequest: [verifyJWT] }, create);

    app.put("/read", { onRequest: [verifyJWT] }, update);

    app.get("/user-reads", { onRequest: [verifyJWT] }, findManyByUser);
    app.get("/read/ratings", getReadsRatings);
}
