import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { findByBookAndUser } from "./find-by-book-and-user";
import { getTotalCountByBook } from "./get-total-count-by-book";

// POST
import { create } from "./create";

// DELETE
import { deleteLike } from "./delete";

export async function likeRoutes(app: FastifyInstance) {
    app.get("/likes/book/:bookId", { onRequest: [verifyJWT] }, findByBookAndUser);

    app.get("/get-total-like-count/book/:bookId", getTotalCountByBook);

    app.post("/likes", { onRequest: [verifyJWT] }, create);

    app.delete("/likes/:likeId", { onRequest: [verifyJWT] }, deleteLike);
}
