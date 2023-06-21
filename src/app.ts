import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import { ZodError } from "zod";

import { env } from "./env";

import { usersRoutes } from "./http/controllers/users/routes";
import { bookRoutes } from "./http/controllers/books/routes";
import { readRoutes } from "./http/controllers/read/routes";

export const app = fastify({
    bodyLimit: 1024 * 1024 * 1024 * 2.5, // 2.5GB
});

if (env.NODE_ENV === "dev") {
    app.register(cors, {
        origin: env.BASE_URL_FRONT_END,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    });
}

app.register(fastifyMultipart);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "10m",
    },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(bookRoutes);
app.register(readRoutes);

app.addHook("onSend", (request, reply, payload, done) => {
    reply.header("Cross-Origin-Embedder-Policy", "require-corp");
    reply.header("Cross-Origin-Opener-Policy", "same-origin");
    done(null, payload);
});

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error.", issues: error.format() });
    }

    if (env.NODE_ENV === "production") {
        // TODO: Here we should log to and external tool like DataDog/NewRelic/Sentry
    } else {
        console.error(error);
    }

    return reply.status(500).send({ message: "Internal server error." });
});
