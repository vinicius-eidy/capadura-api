import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../users-repository";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        const userCamelCase = transformKeysToCamelCase(user);

        return userCamelCase;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async findByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        const userCamelCase = transformKeysToCamelCase(user);

        return userCamelCase;
    }

    async update(data: Prisma.UserUpdateInput) {
        const {
            id,
            name,
            username,
            email,
            description,
            favorite_books,
            location,
            website,
            twitter,
        } = data;

        const user = await prisma.user.update({
            where: {
                id: id as string,
            },
            data: {
                name,
                username,
                email,
                description,
                favorite_books,
                location,
                website,
                twitter,
            },
        });

        const userCamelCase = transformKeysToCamelCase(user);

        return userCamelCase;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        const userCamelCase = transformKeysToCamelCase(user);

        return userCamelCase;
    }
}
