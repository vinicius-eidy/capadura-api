import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { fetchManyByUser } from "./fetch-many-by-user";
import { findUnique } from "./find-unique";
import { fetchManyByUserForUniqueBook } from "./fetch-many-by-user-for-unique-book";
import { getReadsRatings } from "./get-reads-ratings";
import { getTotalFinishedReadsCountByBook } from "./get-total-finished-reads-count-by-book";

// POST
import { create } from "./create";

// PUT
import { update } from "./update";

// DELETE
import { deleteRead } from "./delete";

export async function readRoutes(app: FastifyInstance) {
    app.get("/user-reads", fetchManyByUser);
    app.get("/read/:readId", findUnique);
    app.get("/user-reads/book/:bookId", { onRequest: [verifyJWT] }, fetchManyByUserForUniqueBook);
    app.get("/read/ratings", getReadsRatings);
    app.get("/get-total-finished-reads-count/book/:bookId", getTotalFinishedReadsCountByBook);

    app.post("/read", { onRequest: [verifyJWT] }, create);

    app.put("/read", { onRequest: [verifyJWT] }, update);

    app.delete("/read/:readId", { onRequest: [verifyJWT] }, deleteRead);
}
