import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { LikesRepository } from "../likes-repository";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";
import { UnauthorizedError } from "@/use-cases/_errors/unauthorized-error";

export class PrismaLikesRepository implements LikesRepository {
    async findUniqueById(likeId: string) {
        const like = await prisma.like.findUnique({
            where: {
                id: likeId,
            },
        });

        return like;
    }

    async findManyByUserId(userId: string) {
        const likes = await prisma.like.findMany({
            where: {
                user_id: userId,
            },
            include: {
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: true,
                        publish_date: true,
                        page_count: true,
                        image_key: true,
                    },
                },
            },
        });

        return likes;
    }

    async findManyByBookId(bookId: string) {
        const likes = await prisma.like.findMany({
            where: {
                book_id: bookId,
            },
        });

        return likes;
    }

    async getTotalCountByUser(userId: string) {
        const count = await prisma.like.count({
            where: {
                user_id: userId,
            },
        });

        return count;
    }

    async getTotalCountByBook(bookId: string) {
        const count = await prisma.like.count({
            where: {
                book_id: bookId,
            },
        });

        return count;
    }

    async findUniqueByBookIdAndUserId(bookId: string, userId: string) {
        const like = await prisma.like.findFirst({
            where: {
                book_id: bookId,
                user_id: userId,
            },
        });

        return like || null;
    }

    async delete(likeId: string, userId: string) {
        const like = await prisma.like.findUnique({
            where: {
                id: likeId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                    },
                },
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

        return like;
    }
}
