import { randomUUID } from "node:crypto";
import { User, Prisma } from "@prisma/client";

import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async findByUsername(username: string) {
        const user = this.items.find((item) => item.username === username);

        if (!user) {
            return null;
        }

        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.username,
            username: data.username,
            email: data.email,
            description: data.description ?? null,
            favorite_books: [],
            location: data.location ?? null,
            website: data.website ?? null,
            twitter: data.twitter ?? null,
            password_hash: data.password_hash,
            created_at: new Date(),
        };

        this.items.push(user);

        return user;
    }
}
