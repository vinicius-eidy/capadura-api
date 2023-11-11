import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateBookListUseCase } from "@/use-cases/_factories/book-lists/make-create-book-list-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2 MB;
    const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

    const createBookListBodySchema = z.object({
        name: z
            .string()
            .min(1, { message: "Campo obrigatório" })
            .max(80, { message: "Máximo 80 caracteres" }),
        description: z.string().max(600, { message: "Máximo 600 caracteres" }).optional(),
        image: z
            .any()
            .refine((file) => file[0]?.data?.length <= MAX_FILE_SIZE, `O tamanho máximo é 2MB.`)
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.some((item) => file[0]?.filename.includes(item)),
                "Formatos permitidos: .jpg, .jpeg, .png and .webp.",
            )
            .optional(),
    });

    try {
        const { name, description, image } = createBookListBodySchema.parse(request.body);

        const createBookListUseCase = makeCreateBookListUseCase();
        const bookList = await createBookListUseCase.execute({
            name,
            description,
            imageBuffer: image?.[0]?.data,
            userId: request.user.sub,
        });

        reply.status(201).send(transformKeysToCamelCase(bookList));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOK LISTS - Create]: ",
        });
    }
}
