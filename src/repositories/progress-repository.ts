import { Prisma, Progress } from "@prisma/client";

export interface FindManyByReadInput {
    readId: string;
    page: number;
    perPage: number;
}

export interface FindManyByUserInput {
    userId: string;
    page: number;
    perPage: number;
}

export interface ProgressWithRead extends Progress {
    read: {
        id: string;
        book_id: string;
        book: {
            id: string;
            title: string;
            image_key: string | null;
            imageUrl?: string;
            page_count: number | null;
        };
    };
}

interface FindManyByReadOutput {
    progress: Progress[];
    total: number;
}

interface FindManyByUserOutput {
    progress: ProgressWithRead[];
    total: number;
}

export interface GetLastProgressPageInput {
    readId: string;
    lessThanPages: number;
}

export interface getPagesReadedByDayInput {
    userId: string;
    startDate: string;
    endDate: string;
}

export type GetPagesReadedByDayOutput = { created_at: string; pages_readed: number }[];

export interface ProgressRepository {
    findUniqueById(progressId: string): Promise<Progress | null>;
    findManyByRead(data: FindManyByReadInput): Promise<FindManyByReadOutput>;
    findManyByUser(data: FindManyByUserInput): Promise<FindManyByUserOutput>;
    getLastProgressPage(data: GetLastProgressPageInput): Promise<number | null>;
    getPagesReadedByDay(data: getPagesReadedByDayInput): Promise<GetPagesReadedByDayOutput>;
    update(data: Prisma.ProgressUpdateInput): Promise<Progress>;
    create(data: Prisma.ProgressUncheckedCreateInput): Promise<Progress>;
    delete(progressId: string): Promise<void>;
}
