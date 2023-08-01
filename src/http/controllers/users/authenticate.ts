import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/use-cases/_errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export const sessionCookieSettings = {
    path: "/",
    secure: true, // HTTPS
    sameSite: true,
    // httpOnly: true, // accessible just in back-end
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
                    ...user,
                    passwordHash: undefined,
                },
            });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }
}
