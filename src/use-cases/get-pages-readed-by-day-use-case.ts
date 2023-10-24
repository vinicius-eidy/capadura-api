import { subDays } from "date-fns";

import { ProgressRepository } from "@/repositories/progress-repository";

interface GetPagesReadedByDayUseCaseRequest {
    userId: string;
}

interface GetPagesReadedByDayUseCaseResponse {
    data: { created_at: string; pages_readed: number }[];
}

export class GetPagesReadedByDayUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        userId,
    }: GetPagesReadedByDayUseCaseRequest): Promise<GetPagesReadedByDayUseCaseResponse> {
        const subtracted30Days = subDays(new Date(), 30).toISOString();
        const startOfToday = new Date().toISOString();

        const data = await this.progressRepository.getPagesReadedByDay({
            userId,
            startDate: subtracted30Days,
            endDate: startOfToday,
        });

        return {
            data,
        };
    }
}
