import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    username: string;
    email: string;
    description?: string;
    favoriteBooks?: string[];
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
        favoriteBooks,
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
            favorite_books: favoriteBooks,
            location,
            website,
            twitter,
        });

        return user;
    }
}
