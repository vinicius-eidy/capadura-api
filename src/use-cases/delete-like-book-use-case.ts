import { LikesRepository } from "@/repositories/likes-repository";

interface DeleteLikeBookUseCaseRequest {
    likeId: string;
    userId: string;
}

export class DeleteLikeBookUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ likeId, userId }: DeleteLikeBookUseCaseRequest): Promise<void> {
        try {
            await this.likesRepository.delete(likeId, userId);

            return;
        } catch (err) {
            throw err;
        }
    }
}
