import { PrismaFollowsRepository } from "@/repositories/prisma/prisma-followers-repository";
import { DeleteFollowUseCase } from "@/use-cases/delete-follow-use-case";

export function makeDeleteFollowUseCase() {
    const followsRepository = new PrismaFollowsRepository();
    const useCase = new DeleteFollowUseCase(followsRepository);

    return useCase;
}
