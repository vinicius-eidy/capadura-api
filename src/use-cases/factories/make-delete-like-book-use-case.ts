import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { DeleteLikeBookUseCase } from "../delete-like-book-use-case";

export function makeDeleteLikeBookUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const useCase = new DeleteLikeBookUseCase(likesRepository);

    return useCase;
}
