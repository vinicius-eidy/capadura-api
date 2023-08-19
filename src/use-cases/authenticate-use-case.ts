import { compare } from "bcryptjs";
import { User } from "@prisma/client";

import { UsersRepository } from "@/repositories/users-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { InvalidCredentialsError } from "./_errors/invalid-credentials-error";

interface UserWithImageUrl extends User {
    imageUrl?: string;
}

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: UserWithImageUrl;
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        let imageUrl;
        if (user.image_key) {
            imageUrl = getSignedUrlUtil({ key: user.image_key });
        }

        const userWithImageUrl = {
            ...user,
            imageUrl,
        };

        return {
            user: userWithImageUrl,
        };
    }
}
