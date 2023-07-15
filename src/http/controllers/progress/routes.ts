import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { update } from "./update";
import { findManyByRead } from "./find-many-by-read";
import { findManyByUser } from "./find-many-by-user";

export async function progressRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/progress", create);

    app.put("/progress", update);

    app.get("/progress/read/:readId", findManyByRead);
    app.get("/user-progress/:userId", findManyByUser);
}
