import { PrismaFollowsRepository } from "@/repositories/prisma/prisma-followers-repository";
import { CreateFollowUseCase } from "@/use-cases/create-follow-use-case";

export function makeCreateFollowUseCase() {
    const followsRepository = new PrismaFollowsRepository();
    const useCase = new CreateFollowUseCase(followsRepository);

    return useCase;
}
