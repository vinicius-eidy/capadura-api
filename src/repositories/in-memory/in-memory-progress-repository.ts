import { randomUUID } from "node:crypto";
import { Prisma, Progress } from "@prisma/client";

import { ProgressRepository, findManyByRead, findManyByUser } from "../progress-repository";
import { ResourceNotFoundError } from "@/use-cases/_errors/resource-not-found-error";

export class InMemoryProgressRepository implements ProgressRepository {
    public items: Progress[] = [];

    async findUniqueById(progressId: string) {
        const progress = this.items.find((item) => item.id === progressId);

        return progress || null;
    }

    async findManyByRead({ readId, page, perPage }: findManyByRead) {
        const progress = this.items
            .filter((item) => item.read_id === readId)
            .slice((page - 1) * perPage, page * perPage);

        const total = this.items.filter((item) => item.read_id === readId).length;

        return { progress, total };
    }

    async findManyByUser({ userId, page, perPage }: findManyByUser) {
        const progress = this.items
            .filter((item) => item.user_id === userId)
            .slice((page - 1) * perPage, page * perPage);

        const total = this.items.filter((item) => item.user_id === userId).length;

        return { progress, total };
    }

    async update(data: Prisma.ProgressUpdateInput) {
        let updateItem = this.items.find((item) => item.id === data.id);

        if (!updateItem) {
            throw new ResourceNotFoundError();
        }

        const { description, is_spoiler, page, percentage } = updateItem;

        updateItem = {
            ...updateItem,
            description: (data.description ?? description) as string | null,
            is_spoiler: (data.is_spoiler ?? is_spoiler) as boolean,
            page: (data.page ?? page) as number | null,
            percentage: (data.percentage ?? percentage) as number | null,
        };
        return updateItem;
    }

    async create(data: Prisma.ProgressUncheckedCreateInput) {
        const {
            id = randomUUID(),
            description = null,
            is_spoiler,
            page = null,
            percentage = null,
            read_id,
            user_id,
        } = data;

        const progress = {
            id,
            description,
            is_spoiler,
            page,
            percentage,
            read_id,
            user_id,
            created_at: new Date(),
        };

        this.items.push(progress);

        return progress;
    }

    async delete(progressId: string) {
        this.items = this.items.filter((item) => item.id !== progressId);
    }
}
