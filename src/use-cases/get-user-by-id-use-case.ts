import { User } from "@prisma/client";

import { getSignedUrlUtil } from "@/utils/get-signed-url";
import { UsersRepository } from "@/repositories/users-repository";

interface UserWithImageUrl extends User {
    imageUrl?: string;
}

interface GetUserByIdUseCaseRequest {
    userId: string;
}

interface GetUserByIdUseCaseResponse {
    user: UserWithImageUrl | null;
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
        const user: UserWithImageUrl | null = await this.usersRepository.findById(userId);
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
