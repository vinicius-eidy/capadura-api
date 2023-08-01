import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register-use-case";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new RegisterUseCase(usersRepository);

    return useCase;
}
