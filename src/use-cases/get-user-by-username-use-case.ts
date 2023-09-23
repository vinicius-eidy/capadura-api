import { User } from "@prisma/client";

import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface UserWithImageUrl extends User {
    imageUrl?: string;
}

interface GetUserByUsernameUseCaseRequest {
    username: string;
}

interface GetUserByUsernameUseCaseResponse {
    user: UserWithImageUrl | null;
}

export class GetUserByUsernameUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        username,
    }: GetUserByUsernameUseCaseRequest): Promise<GetUserByUsernameUseCaseResponse> {
        const user = await this.usersRepository.findByUsername(username);
        if (!user) {
            return {
                user: null,
            };
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
