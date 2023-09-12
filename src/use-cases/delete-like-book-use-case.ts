import { LikesRepository } from "@/repositories/likes-repository";

import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteLikeBookUseCaseRequest {
    likeId: string;
    userId: string;
}

export class DeleteLikeBookUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ likeId, userId }: DeleteLikeBookUseCaseRequest): Promise<void> {
        try {
            const likeToDelete = await this.likesRepository.findUniqueById(likeId);

            if (!likeToDelete) {
                throw new ResourceNotFoundError();
            }

            if (likeToDelete?.user_id !== userId) {
                throw new UnauthorizedError();
            }

            await this.likesRepository.delete(likeId, userId);
        } catch (err) {
            throw err;
        }
    }
}
