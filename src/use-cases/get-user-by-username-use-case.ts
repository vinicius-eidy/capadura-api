import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface GetUserByUsernameUseCaseRequest {
    username: string;
}

interface GetUserByUsernameUseCaseResponse {
    user: User;
}

export class GetUserByUsernameUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        username,
    }: GetUserByUsernameUseCaseRequest): Promise<GetUserByUsernameUseCaseResponse> {
        const user = await this.usersRepository.findByUsername(username);
        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user,
        };
    }
}
