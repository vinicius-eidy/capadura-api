import { User } from "@prisma/client";

import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface UserWithImageUrl extends User {
    imageUrl?: string;
}

interface GetUsersProfileUseCaseRequest {
    userId: string;
}

interface GetUsersProfileUseCaseResponse {
    user: UserWithImageUrl;
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        userId,
    }: GetUsersProfileUseCaseRequest): Promise<GetUsersProfileUseCaseResponse> {
        const user: UserWithImageUrl | null = await this.usersRepository.findById(userId);
        if (!user) {
            throw new ResourceNotFoundError();
        }

        if (user.image_key) {
            user.imageUrl = getSignedUrlUtil({ key: user.image_key });
        }

        return {
            user,
        };
    }
}
