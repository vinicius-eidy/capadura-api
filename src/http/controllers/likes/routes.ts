import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { findByBookAndUser } from "./find-by-book-and-user";
import { create } from "./create";
import { deleteLike } from "./delete";

export async function likeRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/likes/book/:bookId", findByBookAndUser);

    app.post("/likes", create);

    app.delete("/likes/:likeId", deleteLike);
}
