import { ProgressRepository } from "@/repositories/progress-repository";

import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteProgressUseCaseRequest {
    progressId: string;
    userId: string;
}

export class DeleteProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({ progressId, userId }: DeleteProgressUseCaseRequest): Promise<void> {
        const progressToDelete = await this.progressRepository.findUniqueById(progressId);

        if (!progressToDelete) {
            throw new ResourceNotFoundError();
        }

        if (progressToDelete.user_id !== userId) {
            throw new UnauthorizedError();
        }

        await this.progressRepository.delete(progressId);
    }
}
