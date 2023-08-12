import { Prisma, Progress } from "@prisma/client";

export interface findManyByRead {
    readId: string;
    page: number;
    perPage: number;
}

export interface findManyByUser {
    userId: string;
    page: number;
    perPage: number;
}

interface findManyProgress {
    progress: Progress[];
    total: number;
}

export interface ProgressRepository {
    findUniqueById(progressId: string): Promise<Progress | null>;
    findManyByRead({ readId, page, perPage }: findManyByRead): Promise<findManyProgress>;
    findManyByUser({ userId, page, perPage }: findManyByUser): Promise<findManyProgress>;
    update(data: Prisma.ProgressUpdateInput): Promise<Progress>;
    create(data: Prisma.ProgressUncheckedCreateInput): Promise<Progress>;
}
