import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { transformKeysToCamelCase } from "@/utils/transform-keys-to-camel-case";
import { LikesRepository } from "../likes-repository";

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

    async delete(likeId: string) {
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
