import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserByIdUseCase } from "@/use-cases/get-user-by-id-use-case";

export function makeGetUserByIdUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetUserByIdUseCase(usersRepository);

    return useCase;
}
