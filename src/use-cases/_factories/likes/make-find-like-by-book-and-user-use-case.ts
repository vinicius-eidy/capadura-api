import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { FindLikeByBookAndUserUseCase } from "@/use-cases/find-like-by-book-and-user-use-case";

export function makeFindLikeByBookAndUserUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const useCase = new FindLikeByBookAndUserUseCase(likesRepository);

    return useCase;
}
