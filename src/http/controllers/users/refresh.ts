import { FastifyRequest, FastifyReply } from "fastify";
import { sessionCookieSettings } from "./authenticate";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true });

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: request.user.sub,
                },
            },
        );

        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: request.user.sub,
                    expiresIn: "30d",
                },
            },
        );

        return reply
            .status(200)
            .setCookie("token", token, sessionCookieSettings)
            .setCookie("refreshToken", refreshToken, sessionCookieSettings)
            .send({ token, refreshToken });
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[USERS - Refresh]: ",
        });
    }
}
