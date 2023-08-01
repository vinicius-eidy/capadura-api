import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { CreateLikeBookUseCase } from "@/use-cases/create-like-book-use-case";

export function makeCreateLikeBookUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const useCase = new CreateLikeBookUseCase(likesRepository);

    return useCase;
}
