import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface UpdateProgressUseCaseRequest {
    id: string;
    description?: string;
    isSpoiler: boolean;
    page?: number;
    percentage?: number;
    userId: string;
}

export class UpdateProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        id,
        description,
        isSpoiler,
        page,
        percentage,
        userId,
    }: UpdateProgressUseCaseRequest): Promise<Progress> {
        const progressToUpdate = await this.progressRepository.findUniqueById(id);

        if (!progressToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (progressToUpdate.user_id !== userId) {
            throw new UnauthorizedError();
        }

        const progress = await this.progressRepository.update({
            id,
            description,
            is_spoiler: isSpoiler,
            page,
            percentage,
        });

        return progress;
    }
}
