import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { env } from "@/env";
import { sessionCookieSettings } from "./authenticate";
import { makeHandleGoogleOAuthUseCase } from "@/use-cases/_factories/users/make-handle-google-oauth-session-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

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

        reply.redirect(`${env.BASE_URL_FRONT_END}/inicio`);
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[USERS - Google OAuth]: ",
        });
    }
}
