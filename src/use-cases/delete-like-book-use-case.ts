import { LikesRepository } from "@/repositories/likes-repository";

interface DeleteLikeBookUseCaseRequest {
    likeId: string;
}

export class DeleteLikeBookUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ likeId }: DeleteLikeBookUseCaseRequest): Promise<void> {
        await this.likesRepository.delete(likeId);

        return;
    }
}
