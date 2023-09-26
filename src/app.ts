import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import { ZodError } from "zod";

import { env } from "./env";

import { usersRoutes } from "./http/controllers/users/routes";
import { followsRoutes } from "./http/controllers/follows/routes";
import { userActivitiesRoutes } from "./http/controllers/user-activities/routes";
import { bookRoutes } from "./http/controllers/books/routes";
import { favoriteBooksRoutes } from "./http/controllers/favorite-books/routes";
import { readRoutes } from "./http/controllers/read/routes";
import { progressRoutes } from "./http/controllers/progress/routes";
import { likeRoutes } from "./http/controllers/likes/routes";
import { bookListRoutes } from "./http/controllers/book-lists/routes";
import { booksOnBookListsRoutes } from "./http/controllers/books-on-book-lists/routes";

export const app = fastify({
    bodyLimit: (1024 * 1024 * 1024 * 1) / 0.1, // 0.5GB
});

if (env.NODE_ENV === "dev") {
    app.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    });
}

app.register(fastifyMultipart, {
    addToBody: true,
});

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
app.register(followsRoutes);
app.register(userActivitiesRoutes);
app.register(bookRoutes);
app.register(favoriteBooksRoutes);
app.register(readRoutes);
app.register(progressRoutes);
app.register(likeRoutes);
app.register(bookListRoutes);
app.register(booksOnBookListsRoutes);

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
