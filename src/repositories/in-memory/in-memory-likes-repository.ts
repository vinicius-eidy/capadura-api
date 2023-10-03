import { randomUUID } from "node:crypto";
import { Prisma, Like } from "@prisma/client";
import { LikesRepository } from "../likes-repository";

export class InMemoryLikesRepository implements LikesRepository {
    public items: Like[] = [];

    async findUniqueById(likeId: string) {
        const like = this.items.find((item) => item.id === likeId);

        return like || null;
    }

    async findManyByUserId(userId: string) {
        const likes = this.items.filter((item) => item.user_id === userId);

        return likes;
    }

    async findManyByBookId(bookId: string) {
        const likes = this.items.filter((item) => item.book_id === bookId);

        return likes;
    }

    async getTotalCountByUser(userId: string) {
        const count = this.items.filter((item) => item.user_id === userId).length;

        return count;
    }

    async getTotalCountByBook(bookId: string) {
        const count = this.items.filter((item) => item.book_id === bookId).length;

        return count;
    }

    async findUniqueByBookIdAndUserId(bookId: string, userId: string) {
        const like = this.items.find((item) => {
            return item.book_id === bookId && item.user_id === userId;
        });

        if (!like) {
            return null;
        }

        return like;
    }

    async delete(likeId: string) {
        this.items = this.items.filter((item) => item.id !== likeId);

        return;
    }

    async create(data: Prisma.LikeUncheckedCreateInput) {
        const like = {
            id: data.id || randomUUID(),
            book_id: data.book_id,
            user_id: data.user_id,
            created_at: new Date(),
        };

        this.items.push(like);

        return like;
    }
}
