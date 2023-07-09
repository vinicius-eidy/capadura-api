import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { update } from "./update";
import { findManyByBookByUser } from "./find-many-by-book-and-user";
import { getBookRatings } from "./get-book-ratings";

export async function readRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/read", create);

    app.put("/read", update);

    app.get("/read/:bookId", findManyByBookByUser);
    app.get("/:bookId/ratings", getBookRatings);
}
