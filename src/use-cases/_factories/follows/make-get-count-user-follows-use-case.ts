import { PrismaFollowsRepository } from "@/repositories/prisma/prisma-followers-repository";
import { GetCountUserFollowsUseCase } from "@/use-cases/get-count-user-follows-use-case";

export function makeGetCountUserFollowsUseCase() {
    const followsRepository = new PrismaFollowsRepository();
    const useCase = new GetCountUserFollowsUseCase(followsRepository);

    return useCase;
}
