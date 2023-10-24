import { randomUUID } from "node:crypto";
import { Prisma, Read, ReadStatus } from "@prisma/client";

import {
    FindManyByReviewRatingsAndBookInput,
    FindManyByReviewRatingsAndUserInput,
    FindManyByUserIdForUniqueBookInput,
    FindManyFinishedReadsInput,
    ReadsRepository,
    findManyByBookIdInput,
    findManyByUserIdInput,
} from "../reads-repository";

export class InMemoryReadsRepository implements ReadsRepository {
    public items: Read[] = [];

    async findUniqueById(readId: string) {
        const read = this.items.find((item) => item.id === readId);

        return read || null;
    }

    // @ts-ignore
    async findManyByUserId({ userId, status, page, perPage }: findManyByUserIdInput) {
        const reads = this.items
            .filter((item) => {
                return item.user_id === userId && item.book_id === bookId && item.status === status;
            })
            .slice((page - 1) * perPage, page * perPage);

        return { reads, total: reads.length };
    }

    // @ts-ignore
    async findManyByBookId({ bookId, page, perPage }: findManyByBookIdInput) {}

    // @ts-ignore
    async findManyByUserIdForUniqueBook({ bookId, userId }: FindManyByUserIdForUniqueBookInput) {}

    // @ts-ignore
    async findManyByReviewRatingsAndUser({
        rating,
        userId,
        page,
        perPage,
    }: FindManyByReviewRatingsAndUserInput) {}

    // @ts-ignore
    async findManyByReviewRatingsAndBook({
        rating,
        bookId,
        page,
        perPage,
    }: FindManyByReviewRatingsAndBookInput) {}

    // @ts-ignore
    async findManyFinishedReads({ page, perPage }: FindManyFinishedReadsInput) {
        const reads = this.items
            .filter((item) => !item.is_private && item.status === "FINISHED")
            .slice((page - 1) * perPage, page * perPage);

        return {
            reads,
            total: reads.length,
        };
    }

    // @ts-ignore
    async getAllReviewRatings({ bookId, userId }: { bookId?: string; userId?: string }) {}

    async getTotalFinishedReadsCountByBook(bookId: string) {
        const count = this.items.filter(
            (item) => item.book_id === bookId && item.status === "FINISHED",
        ).length;

        return count;
    }

    async update(data: Prisma.ReadUpdateInput) {
        const itemIndex = this.items.findIndex((item) => item.id === data.id);

        if (itemIndex !== -1) {
            const { status, is_private, review_content, review_rating, review_is_spoiler } =
                this.items[itemIndex];

            this.items[itemIndex] = {
                ...this.items[itemIndex],
                status: (data.status ?? status) as ReadStatus,
                is_private: (data.is_private ?? is_private) as boolean,
                review_content: (data.review_content ?? review_content) as string | null,
                review_rating: (data.review_rating ?? review_rating) as number | null,
                review_is_spoiler: (data.review_is_spoiler ?? review_is_spoiler) as boolean | null,
            };
            return this.items[itemIndex];
        }
    }

    async create(data: Prisma.ReadUncheckedCreateInput) {
        const {
            id = randomUUID(),
            status = "ACTIVE",
            is_private = false,
            end_date,
            book_id,
            user_id,
            review_rating = null,
            review_content = null,
            review_is_spoiler = null,
        } = data;

        const read = {
            id,
            status,
            is_private,
            start_date: new Date(),
            end_date: end_date as Date,
            book_id,
            user_id,
            review_rating,
            review_content,
            review_is_spoiler,
        };

        this.items.push(read);

        return read;
    }

    async delete(readId: string) {
        this.items = this.items.filter((item) => item.id !== readId);
    }
}
