import { User } from "@prisma/client";

import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { UsersRepository } from "@/repositories/users-repository";

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
        const user: UserWithImageUrl | null = await this.usersRepository.findByUsername(username);
        if (!user) {
            return {
                user: null,
            };
        }

        if (user.image_key) {
            user.imageUrl = getSignedUrlUtil({ key: user.image_key });
        }

        return {
            user,
        };
    }
}
