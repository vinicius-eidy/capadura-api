import { randomUUID } from "node:crypto";
import { Prisma, Progress } from "@prisma/client";

import { ProgressRepository } from "../progress-repository";

export class InMemoryProgressRepository implements ProgressRepository {
    public items: Progress[] = [];

    async findManyByRead(readId: string) {
        const items = this.items.filter((item) => item.read_id === readId);

        return items;
    }

    async update(data: Prisma.ProgressUpdateInput) {
        const itemIndex = this.items.findIndex((item) => item.id === data.id);

        if (itemIndex !== -1) {
            const { description, is_spoiler, page, percentage } = this.items[itemIndex];

            this.items[itemIndex] = {
                ...this.items[itemIndex],
                description: (data.description ?? description) as string | null,
                is_spoiler: (data.is_spoiler ?? is_spoiler) as boolean,
                page: (data.page ?? page) as number | null,
                percentage: (data.percentage ?? percentage) as number | null,
            };
            return this.items[itemIndex];
        }

        return;
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
