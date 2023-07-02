import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { update } from "./update";
import { findManyByRead } from "./findManyByRead";

export async function progressRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/progress", create);

    app.put("/progress", update);

    app.get("/progress/:readId", findManyByRead);
}
