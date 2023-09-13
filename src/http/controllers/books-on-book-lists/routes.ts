import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { fetchManyByBookList } from "./fetch-many-by-book-list";
import { getTotalListsWithSomeBookCount } from "./get-total-lists-with-some-book-count";

// POST
import { create } from "./create";

// DELETE
import { deleteBookOnBookList } from "./delete";

export async function booksOnBookListsRoutes(app: FastifyInstance) {
    app.get("/books-on-booklists/bookList/:bookListId", fetchManyByBookList);
    app.get("/get-total-lists-with-some-book-count/book/:bookId", getTotalListsWithSomeBookCount);

    app.post("/books-on-booklists", { onRequest: [verifyJWT] }, create);

    app.delete(
        "/books-on-booklists/:bookOnBookListId",
        { onRequest: [verifyJWT] },
        deleteBookOnBookList,
    );
}
