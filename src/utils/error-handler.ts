import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";

import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { InvalidCredentialsError } from "@/use-cases/_errors/invalid-credentials-error";
import { EmailNotVerifiedError } from "@/use-cases/_errors/email-not-verified-error";

interface ReplyData {
    status: number;
    message: string;
    issues?: unknown;
}

export default function errorHandler(err: Error, _request: FastifyRequest, reply: FastifyReply) {
    console.error("\x1b[31m%s\x1b[0m", err);

    const replyData: ReplyData = {
        status: 500,
        message: "Internal server error",
        issues: undefined,
    };

    switch (true) {
        case err instanceof ZodError:
            replyData.status = 500;
            replyData.message = "Validation error.";
            replyData.issues = (err as ZodError).format();
            break;
        case err instanceof InvalidCredentialsError:
            replyData.status = 400;
            replyData.message = err.message;
            break;
        case err instanceof UnauthorizedError:
            replyData.status = 401;
            replyData.message = err.message;
            break;
        case err instanceof EmailNotVerifiedError:
            replyData.status = 403;
            replyData.message = err.message;
            break;
        case err instanceof ResourceNotFoundError:
            replyData.status = 404;
            replyData.message = err.message;
            break;
        case err instanceof ResourceNotFoundError:
            replyData.status = 409;
            replyData.message = err.message;
            break;
    }

    return reply.status(replyData.status).send({
        message: replyData.message,
        issues: replyData.issues,
    });
}
