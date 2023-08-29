import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { deleteBookOnBookList } from "./delete";
import { fetchManyByBookList } from "./fetch-many-by-book-list";

export async function booksOnBookListsRoutes(app: FastifyInstance) {
    app.post("/books-on-booklists", { onRequest: [verifyJWT] }, create);

    app.get("/books-on-booklists/bookList/:bookListId", fetchManyByBookList);

    app.delete(
        "/books-on-booklists/:bookOnBookListId",
        { onRequest: [verifyJWT] },
        deleteBookOnBookList,
    );
}
