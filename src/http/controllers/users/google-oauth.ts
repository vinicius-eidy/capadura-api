import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { sessionCookieSettings } from "./authenticate";
import { makeHandleGoogleOAuthUseCase } from "@/use-cases/_factories/users/make-handle-google-oauth-session-use-case";
import { EmailNotVerifiedError } from "@/use-cases/_errors/email-not-verified-error";
import { env } from "@/env";

export async function googleOAuth(request: FastifyRequest, reply: FastifyReply) {
    const googleOAuthQuerySchema = z.object({
        code: z.string(),
    });

    const { code } = googleOAuthQuerySchema.parse(request.query);

    try {
        const getGoogleOAuthUserUseCase = makeHandleGoogleOAuthUseCase();
        const { user } = await getGoogleOAuthUserUseCase.execute({
            code,
        });

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            },
        );

        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                    expiresIn: "30d",
                },
            },
        );

        reply.setCookie("token", token, sessionCookieSettings);
        reply.setCookie("refreshToken", refreshToken, sessionCookieSettings);

        reply.redirect(`${env.BASE_URL_FRONT_END}/livros`);
    } catch (err) {
        if (err instanceof EmailNotVerifiedError) {
            return reply.status(403).send({ message: "Email not verified." });
        }

        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
