import { PrismaFollowsRepository } from "@/repositories/prisma/prisma-followers-repository";
import { FetchManyUserFollowingUseCase } from "@/use-cases/fetch-many-user-following-use-case";

export function makeFetchManyUserFollowingUseCase() {
    const followsRepository = new PrismaFollowsRepository();
    const useCase = new FetchManyUserFollowingUseCase(followsRepository);

    return useCase;
}
