import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserByUsernameUseCase } from "../get-user-by-username-use-case";

export function makeGetUserByUsernameUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetUserByUsernameUseCase(usersRepository);

    return useCase;
}
