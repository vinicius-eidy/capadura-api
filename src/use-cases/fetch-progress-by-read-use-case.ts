import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";

interface FetchManyProgressByReadUseCaseRequest {
    readId: string;
}

interface FetchManyProgressByReadUseCaseResponse {
    items: Progress[];
    total: number;
}

export class FetchManyProgressByReadUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        readId,
    }: FetchManyProgressByReadUseCaseRequest): Promise<FetchManyProgressByReadUseCaseResponse> {
        const progressList = await this.progressRepository.findManyByRead(readId);

        return {
            items: progressList,
            total: progressList.length,
        };
    }
}
