import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";

interface CreateProgressUseCaseRequest {
    description?: string;
    isSpoiler: boolean;
    page: number;
    percentage: number;
    readId: string;
    userId: string;
}

interface CreateProgressUseCaseResponse {
    progress: Progress;
}

export class CreateProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        description,
        isSpoiler,
        page,
        percentage,
        readId,
        userId,
    }: CreateProgressUseCaseRequest): Promise<CreateProgressUseCaseResponse> {
        const lastProgressPage = await this.progressRepository.getLastProgressPage({
            readId,
            lessThanPages: page,
        });
        const pagesRead = lastProgressPage ? page - lastProgressPage : page;

        const progress = await this.progressRepository.create({
            description,
            is_spoiler: isSpoiler,
            pages_read: pagesRead,
            page,
            percentage,
            read_id: readId,
            user_id: userId,
        });

        return {
            progress,
        };
    }
}
