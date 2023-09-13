import { FastifyInstance } from "fastify";

// GET
import { create } from "./create";

// POST
import { update } from "./update";

// PUT
import { findUnique } from "./find-unique";

export async function bookRoutes(app: FastifyInstance) {
    app.get("/book/:id", findUnique);

    app.post("/book", create);

    app.put("/book/:id", update);
}
