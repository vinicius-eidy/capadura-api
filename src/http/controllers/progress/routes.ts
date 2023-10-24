import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { findManyByRead } from "./find-many-by-read";
import { findManyByUser } from "./find-many-by-user";
import { getPagesReadedByDay } from "./get-pages-readed-by-day";

// POST
import { create } from "./create";

// PUT
import { update } from "./update";

// DELETE
import { deleteProgress } from "./delete";

export async function progressRoutes(app: FastifyInstance) {
    app.get("/progress/read/:readId", findManyByRead);
    app.get("/user-progress/:userId", findManyByUser);
    app.get("/user/:userId/pages-readed", getPagesReadedByDay);

    app.post("/progress", { onRequest: [verifyJWT] }, create);

    app.put("/progress", { onRequest: [verifyJWT] }, update);

    app.delete("/progress/:progressId", { onRequest: [verifyJWT] }, deleteProgress);
}
