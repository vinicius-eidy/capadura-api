import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { LikesRepository } from "../likes-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

export class PrismaLikesRepository implements LikesRepository {
    async findManyByUserId(userId: string) {
        const likes = await prisma.like.findMany({
            where: {
                user_id: userId,
            },
        });

        const likesCamelCase = transformKeysToCamelCase(likes);

        return likesCamelCase;
    }

    async findManyByBookId(bookId: string) {
        const likes = await prisma.like.findMany({
            where: {
                book_id: bookId,
            },
        });

        const likesCamelCase = transformKeysToCamelCase(likes);

        return likesCamelCase;
    }

    async findUniqueByBookIdAndUserId(bookId: string, userId: string) {
        const like = await prisma.like.findFirst({
            where: {
                book_id: bookId,
                user_id: userId,
            },
        });

        if (!like) {
            return null;
        }

        const likeCamelCase = transformKeysToCamelCase(like);

        return likeCamelCase;
    }

    async delete(likeId: string, userId: string) {
        const like = await prisma.like.findUnique({
            where: {
                id: likeId,
            },
            include: {
                user: true,
            },
        });

        if (!like) {
            throw new ResourceNotFoundError();
        }

        // Check if the authenticated user is the owner of the like
        if (like.user.id !== userId) {
            throw new UnauthorizedError();
        }

        await prisma.like.delete({
            where: {
                id: likeId,
            },
        });

        return;
    }

    async create(data: Prisma.LikeUncheckedCreateInput) {
        const like = await prisma.like.create({
            data,
        });

        const likeCamelCase = transformKeysToCamelCase(like);

        return likeCamelCase;
    }
}
