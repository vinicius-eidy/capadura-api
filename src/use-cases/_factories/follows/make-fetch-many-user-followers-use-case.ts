import { PrismaFollowsRepository } from "@/repositories/prisma/prisma-followers-repository";
import { FetchManyUserFollowersUseCase } from "@/use-cases/fetch-many-user-followers-use-case";

export function makeFetchManyUserFollowersUseCase() {
    const followsRepository = new PrismaFollowsRepository();
    const useCase = new FetchManyUserFollowersUseCase(followsRepository);

    return useCase;
}
