import { ReadsRepository } from "@/repositories/reads-repository";

import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteReadUseCaseRequest {
    readId: string;
    userId: string;
}

export class DeleteReadUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({ readId, userId }: DeleteReadUseCaseRequest): Promise<void> {
        const readToDelete = await this.readsRepository.findUniqueById(readId);

        if (!readToDelete) {
            throw new ResourceNotFoundError();
        }

        if (readToDelete.user_id !== userId) {
            throw new UnauthorizedError();
        }

        await this.readsRepository.delete(readId);
    }
}
