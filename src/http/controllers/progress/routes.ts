import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { findManyByBookByUser } from "./findManyByBookAndUser";

export async function readRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/read", create);

    app.get("/read/:bookId", findManyByBookByUser);
}
