import { FastifyInstance } from "fastify";

import { create } from "./create";
import { update } from "./update";
import { findUnique } from "./find-unique";

export async function bookRoutes(app: FastifyInstance) {
    app.post("/book", create);

    app.put("/book/:id", update);

    app.get("/book/:id", findUnique);
}
