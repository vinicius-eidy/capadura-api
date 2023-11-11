import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUpdateBookListUseCase } from "@/use-cases/_factories/book-lists/make-update-book-list-use-case";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { buildErrorMessage } from "@/utils/build-error-message";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2 MB;
    const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

    const updateBookListBodySchema = z.object({
        bookListId: z.string(),
        name: z.string().max(80, { message: "Máximo 80 caracteres" }).optional(),
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
        const { bookListId, name, description, image } = updateBookListBodySchema.parse(
            request.body,
        );

        const updateBookListUseCase = makeUpdateBookListUseCase();
        const updatedBookList = await updateBookListUseCase.execute({
            bookListId,
            name,
            description,
            imageBuffer: image?.[0]?.data,
            userId: request.user.sub,
        });

        reply.status(200).send(transformKeysToCamelCase(updatedBookList));
    } catch (err) {
        buildErrorMessage({
            err,
            prefix: "[BOOK LISTS - Update]: ",
        });
    }
}
