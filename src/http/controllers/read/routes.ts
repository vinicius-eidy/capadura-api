import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { findUnique } from "./find-unique";
import { fetchManyByUser } from "./fetch-many-by-user";
import { fetchManyByBook } from "./fetch-many-by-book";
import { fetchManyFinishedReads } from "./fetch-many-finished-reads";
import { fetchManyByUserForUniqueBook } from "./fetch-many-by-user-for-unique-book";
import { fetchManyByReviewRatingsAndUser } from "./fetch-many-by-review-ratings-and-user";
import { fetchManyByReviewRatingsAndBook } from "./fetch-many-by-review-ratings-and-book";
import { getReadsRatings } from "./get-reads-ratings";
import { getTotalFinishedReadsCountByBook } from "./get-total-finished-reads-count-by-book";

// POST
import { create } from "./create";

// PUT
import { update } from "./update";

// DELETE
import { deleteRead } from "./delete";

export async function readRoutes(app: FastifyInstance) {
    app.get("/read/:readId", findUnique);
    app.get("/user-reads", fetchManyByUser);
    app.get("/book/:bookId/reads", fetchManyByBook);
    app.get("/reads/finished-reads", fetchManyFinishedReads);
    app.get("/user-reads/book/:bookId", { onRequest: [verifyJWT] }, fetchManyByUserForUniqueBook);
    app.get("/user/:userId/read-ratings/:rating", fetchManyByReviewRatingsAndUser);
    app.get("/book/:bookId/read-ratings/:rating", fetchManyByReviewRatingsAndBook);
    app.get("/read/ratings", getReadsRatings);
    app.get("/get-total-finished-reads-count/book/:bookId", getTotalFinishedReadsCountByBook);

    app.post("/read", { onRequest: [verifyJWT] }, create);

    app.put("/read", { onRequest: [verifyJWT] }, update);

    app.delete("/read/:readId", { onRequest: [verifyJWT] }, deleteRead);
}
