import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";

interface UpdateProgressUseCaseRequest {
    id: string;
    description?: string;
    isSpoiler: boolean;
    page?: number;
    percentage?: number;
}

export class UpdateProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        id,
        description,
        isSpoiler,
        page,
        percentage,
    }: UpdateProgressUseCaseRequest): Promise<Progress> {
        const read = await this.progressRepository.update({
            id,
            description,
            is_spoiler: isSpoiler,
            page,
            percentage,
        });

        return read;
    }
}
