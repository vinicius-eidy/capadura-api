import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";

interface FetchManyProgressByUserUseCaseRequest {
    userId: string;
    page: number;
    perPage: number;
}

interface FetchManyProgressByUserUseCaseResponse {
    items: Progress[];
    total: number;
}

export class FetchManyProgressByUserUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        userId,
        page,
        perPage,
    }: FetchManyProgressByUserUseCaseRequest): Promise<FetchManyProgressByUserUseCaseResponse> {
        const { progress, total } = await this.progressRepository.findManyByUser({
            userId,
            page,
            perPage,
        });

        return {
            items: progress,
            total: total,
        };
    }
}
