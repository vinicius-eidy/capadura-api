import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

// GET
import { profile } from "./profile";
import { googleOAuth } from "./google-oauth";
import { findByUsername } from "./find-by-username";
import { findById } from "./find-by-id";

// POST
import { register } from "./register";
import { authenticate } from "./authenticate";

// PUT
import { update } from "./update";

// PATCH
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
    app.get("/me", { onRequest: [verifyJWT] }, profile);
    app.get("/sessions/oauth/google", googleOAuth);
    app.get("/users/username/:username", findByUsername);
    app.get("/users/id/:userId", findById);

    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.put("/me", { onRequest: [verifyJWT] }, update);

    app.patch("/token/refresh", refresh);
}
