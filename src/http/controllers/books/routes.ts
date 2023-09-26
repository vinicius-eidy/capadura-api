import { FastifyInstance } from "fastify";

// GET
import { findUnique } from "./find-unique";
import { fetchManyIds } from "./fetch-many-ids";

// POST
import { create } from "./create";

// PUT
import { update } from "./update";

export async function bookRoutes(app: FastifyInstance) {
    app.get("/book/:id", findUnique);
    app.get("/book-ids", fetchManyIds);

    app.post("/book", create);

    app.put("/book/:id", update);
}
