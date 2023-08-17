import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { findByUser } from "./find-by-user";
import { update } from "./update";
import { create } from "./create";
import { deleteFavoriteBook } from "./delete";

export async function favoriteBooksRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/favorite-books/user/:username", findByUser);

    app.put("/favorite-books", update);

    app.post("/favorite-books", create);

    app.delete("/favorite-books/:favoriteBookId", deleteFavoriteBook);
}
