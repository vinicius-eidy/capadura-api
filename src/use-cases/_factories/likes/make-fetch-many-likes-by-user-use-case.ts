import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { FetchManyLikesByUserUseCase } from "@/use-cases/fetch-many-likes-by-user-use-case";

export function makeFetchManyLikesByUserUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const useCase = new FetchManyLikesByUserUseCase(likesRepository);

    return useCase;
}
