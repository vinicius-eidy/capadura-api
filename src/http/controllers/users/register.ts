import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeRegisterUseCase } from "@/use-cases/_factories/users/make-register-use-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { username, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({
            username,
            email,
            password,
        });

        return reply.status(201).send();
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[USERS - Register]: ",
        });
    }
}
