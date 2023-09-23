import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeUpdateUserUseCase } from "@/use-cases/_factories/users/make-update-user-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UserAlreadyExistsError } from "@/use-cases/_errors/user-already-exists-error";
import { CustomError } from "@/use-cases/_errors/custom-error";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2 MB;
    const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

    const updateUserBodySchema = z.object({
        id: z.string(),
        name: z
            .string()
            .min(1, { message: "Campo obrigatório." })
            .max(100, { message: "Máximo 100 caracteres." }),
        username: z
            .string()
            .min(1, { message: "Campo obrigatório." })
            .max(50, { message: "Máximo 50 caracteres." }),
        email: z.string().email(),
        image: z
            .any()
            .refine((file) => file[0]?.data?.length <= MAX_FILE_SIZE, `O tamanho máximo é 2MB.`)
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.some((item) => file[0]?.filename.includes(item)),
                "Formatos permitidos: .jpg, .jpeg, .png and .webp.",
            )
            .optional(),
        description: z.string().max(600, { message: "Máximo 600 caracteres." }).optional(),
        location: z.string().max(50, { message: "Máximo 50 caracteres." }).optional(),
        website: z.union([z.literal(""), z.string().trim().url()]).optional(),
        twitter: z.string().optional(),
    });

    try {
        const { id, name, username, email, image, description, location, website, twitter } =
            updateUserBodySchema.parse(request.body);

        const updateUserUseCase = makeUpdateUserUseCase();

        const { user } = await updateUserUseCase.execute({
            id,
            name,
            username,
            email,
            imageBuffer: image?.[0]?.data,
            description,
            location,
            website,
            twitter,
        });

        return reply.status(200).send({
            ...transformKeysToCamelCase(user),
            passwordHash: undefined,
        });
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        if (err instanceof CustomError) {
            return reply.status(400).send({ message: err.message });
        }

        if (err instanceof Error) {
            return reply.status(500).send({ message: err.message });
        }

        throw err;
    }
}
