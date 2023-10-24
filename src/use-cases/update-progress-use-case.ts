import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface UpdateProgressUseCaseRequest {
    id: string;
    description?: string;
    isSpoiler: boolean;
    userId: string;
}

interface UpdateProgressUseCaseResponse {
    progress: Progress;
}

export class UpdateProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        id,
        description,
        isSpoiler,
        userId,
    }: UpdateProgressUseCaseRequest): Promise<UpdateProgressUseCaseResponse> {
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
        });

        return {
            progress,
        };
    }
}
