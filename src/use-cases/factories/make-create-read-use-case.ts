import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { CreateReadUseCase } from "../create-read-use-case";

export function makeCreateReadUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new CreateReadUseCase(readsRepository);

    return useCase;
}
