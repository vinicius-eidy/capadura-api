import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { findByUser } from "./find-by-user";

// POST
import { create } from "./create";

// PUT
import { update } from "./update";

// DELETE
import { deleteFavoriteBook } from "./delete";

export async function favoriteBooksRoutes(app: FastifyInstance) {
    app.get("/favorite-books/user/:username", findByUser);

    app.post("/favorite-books", { onRequest: [verifyJWT] }, create);

    app.put("/favorite-books", { onRequest: [verifyJWT] }, update);

    app.delete("/favorite-books/:favoriteBookId", { onRequest: [verifyJWT] }, deleteFavoriteBook);
}
