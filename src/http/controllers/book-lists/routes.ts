import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { findByUser } from "./find-by-user";
import { create } from "./create";
import { deleteBookList } from "./delete";

export async function bookListRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/booklists/user/:userId", findByUser);

    app.post("/booklists", create);

    app.delete("/booklists/:bookListId", deleteBookList);
}
