import { FastifyRequest, FastifyReply } from "fastify";
import { CookieSerializeOptions } from "@fastify/cookie";
import { z } from "zod";

import { env } from "@/env";
import { makeAuthenticateUseCase } from "@/use-cases/_factories/users/make-authenticate-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export const sessionCookieSettings: CookieSerializeOptions = {
    path: "/",
    secure: true, // HTTPS
    sameSite: true,
    domain: env.DOMAIN,
};

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();

        const { user } = await authenticateUseCase.execute({
            email,
            password,
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

        return reply
            .status(200)
            .setCookie("token", token, sessionCookieSettings)
            .setCookie("refreshToken", refreshToken, sessionCookieSettings)
            .send({
                token,
                refreshToken,
                user: {
                    ...transformKeysToCamelCase(user),
                    passwordHash: undefined,
                },
            });
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[USERS - Authenticate]: ",
        });
    }
}
