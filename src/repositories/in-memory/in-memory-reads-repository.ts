import { randomUUID } from "node:crypto";
import { Prisma, Read, ReadStatus } from "@prisma/client";

import { ReadsRepository, findManyByBookByUserIdRequest } from "../reads-repository";

export class InMemoryReadsRepository implements ReadsRepository {
    public items: Read[] = [];

    async findManyByBookByUserId({ userId, bookId }: findManyByBookByUserIdRequest) {
        const items = this.items.filter(
            (item) => item.user_id === userId && item.book_id === bookId,
        );

        return items;
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

        return;
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
}
