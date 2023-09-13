import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { GetTotalLikeCountByBookUseCase } from "@/use-cases/get-total-like-count-by-book-use-case";

export function makeGetTotalLikeCountByBookUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const useCase = new GetTotalLikeCountByBookUseCase(likesRepository);

    return useCase;
}
