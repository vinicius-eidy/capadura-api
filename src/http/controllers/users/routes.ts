import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { googleOAuth } from "./google-oauth";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.patch("/token/refresh", refresh);

    app.get("/sessions/oauth/google", googleOAuth);

    // Authenticated routes
    app.get("/me", { onRequest: [verifyJWT] }, profile);
}
