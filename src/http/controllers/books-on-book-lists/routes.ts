import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { deleteBookOnBookList } from "./delete";

export async function booksOnBookListsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/books-on-booklists", create);

    app.delete("/books-on-booklists/:bookOnBookListId", deleteBookOnBookList);
}
