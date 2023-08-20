import { PrismaFollowsRepository } from "@/repositories/prisma/prisma-followers-repository";
import { GetIsCurrentUserFollowingAnUniqueUserUseCase } from "@/use-cases/get-is-current-user-following-an-unique-user-use-case";

export function makeGetIsCurrentUserFollowingAnUniqueUserUseCase() {
    const followsRepository = new PrismaFollowsRepository();
    const useCase = new GetIsCurrentUserFollowingAnUniqueUserUseCase(followsRepository);

    return useCase;
}
