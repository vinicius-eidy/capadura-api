import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { findByUser } from "./find-by-user";
import { update } from "./update";
import { create } from "./create";
import { deleteBookList } from "./delete";

export async function bookListRoutes(app: FastifyInstance) {
    app.get("/booklists/user/:userId", findByUser);

    app.put("/booklists", { onRequest: [verifyJWT] }, update);

    app.post("/booklists", { onRequest: [verifyJWT] }, create);

    app.delete("/booklists/:bookListId", { onRequest: [verifyJWT] }, deleteBookList);
}
