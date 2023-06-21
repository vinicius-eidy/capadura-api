import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { findUnique } from "./find-unique";

export async function bookRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/book", create);

    app.get("/book/:id", findUnique);
}
