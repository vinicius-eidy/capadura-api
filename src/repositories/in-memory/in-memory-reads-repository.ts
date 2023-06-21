import { randomUUID } from "node:crypto";
import { Book, Prisma, Read } from "@prisma/client";

import { ReadsRepository, findManyByBookByUserIdRequest } from "../reads-repository";

export class InMemoryReadsRepository implements ReadsRepository {
    public items: Read[] = [];

    async findManyByBookByUserId({ userId, bookId, page }: findManyByBookByUserIdRequest) {
        const items = this.items
            .filter((item) => item.user_id === userId && item.book_id === bookId)
            .slice((page - 1) * 20, page * 20);

        return {
            items,
            total: this.items.length,
        };
    }

    async create(data: Prisma.ReadUncheckedCreateInput) {
        const {
            id = randomUUID(),
            status = "ACTIVE",
            is_private = false,
            end_date,
            book_id,
            user_id,
        } = data;

        const read = {
            id,
            status,
            is_private,
            start_date: new Date(),
            end_date: end_date as Date,
            book_id,
            user_id,
        };

        this.items.push(read);

        return read;
    }
}
