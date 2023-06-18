import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { HandleGoogleOAuthSessionUseCase } from "../handle-google-oauth-session-use-case";

export function makeHandleGoogleOAuthUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new HandleGoogleOAuthSessionUseCase(usersRepository);

    return useCase;
}
