import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { findByBookAndUser } from "./find-by-book-and-user";
import { create } from "./create";
import { deleteLike } from "./delete";

export async function likeRoutes(app: FastifyInstance) {
    app.get("/likes/book/:bookId", { onRequest: [verifyJWT] }, findByBookAndUser);

    app.post("/likes", { onRequest: [verifyJWT] }, create);

    app.delete("/likes/:likeId", { onRequest: [verifyJWT] }, deleteLike);
}
