import { randomUUID } from "node:crypto";
import { Prisma, Progress } from "@prisma/client";

import { ProgressRepository } from "../progress-repository";

export class InMemoryProgressRepository implements ProgressRepository {
    public items: Progress[] = [];

    async findManyByRead(readId: string) {
        const items = this.items.filter((item) => item.read_id === readId);

        return items;
    }

    async create(data: Prisma.ProgressUncheckedCreateInput) {
        const {
            id = randomUUID(),
            description = null,
            is_spoiler,
            page = null,
            percentage = null,
            read_id,
        } = data;

        const progress = {
            id,
            description,
            is_spoiler,
            page,
            percentage,
            read_id,
            created_at: new Date(),
        };

        this.items.push(progress);

        return progress;
    }
}
