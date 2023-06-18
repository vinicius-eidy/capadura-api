import { UsersRepository } from "@/repositories/users-repository";
import { getGoogleOAuthTokens } from "@/utils/get-google-oauth-tokens";
import { GoogleOAuthUserResponse, getGoogleOAuthUser } from "@/utils/get-google-oauth-user";
import { User } from "@prisma/client";

interface HandleGoogleOAuthSessionUseCaseRequest {
    code: string;
}

interface HandleGoogleOAuthSessionUseCaseResponse {
    user: User;
}

export class HandleGoogleOAuthSessionUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        code,
    }: HandleGoogleOAuthSessionUseCaseRequest): Promise<HandleGoogleOAuthSessionUseCaseResponse> {
        const { id_token, access_token } = await getGoogleOAuthTokens(code);

        const googleUser: GoogleOAuthUserResponse = await getGoogleOAuthUser({
            id_token,
            access_token,
        });

        const userWithSameEmail = await this.usersRepository.findByEmail(googleUser.email);

        if (userWithSameEmail) {
            return {
                user: userWithSameEmail,
            };
        }

        const { id, name, email } = googleUser;
        const user = await this.usersRepository.create({
            id,
            name,
            email,
            password_hash: "gauth",
        });

        return {
            user,
        };
    }
}
