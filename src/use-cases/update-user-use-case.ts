import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    username: string;
    email: string;
    description?: string;
    location?: string;
    website?: string;
    twitter?: string;
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        id,
        name,
        username,
        email,
        description,
        location,
        website,
        twitter,
    }: UpdateUserUseCaseRequest): Promise<User> {
        const existentUser = await this.usersRepository.findById(id);
        if (!existentUser) {
            throw new ResourceNotFoundError();
        }

        const user = await this.usersRepository.update({
            id,
            name,
            username,
            email,
            description,
            location,
            website,
            twitter,
        });

        return user;
    }
}
