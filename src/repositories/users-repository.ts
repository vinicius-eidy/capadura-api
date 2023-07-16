import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    update(data: Prisma.UserUpdateInput): Promise<User>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}
