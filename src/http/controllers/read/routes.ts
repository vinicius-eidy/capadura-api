import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { update } from "./update";
import { findManyByUser } from "./find-many-by-book-and-user";
import { getReadsRatings } from "./get-reads-ratings";

export async function readRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/read", create);

    app.put("/read", update);

    app.get("/user-reads", findManyByUser);
    app.get("/read/ratings", getReadsRatings);
}
