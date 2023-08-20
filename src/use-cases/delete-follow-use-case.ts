import { FollowsRepository } from "@/repositories/follows-repository";

interface DeleteFollowUseCaseRequest {
    followerId: string;
    followingId: string;
}

export class DeleteFollowUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({ followerId, followingId }: DeleteFollowUseCaseRequest): Promise<void> {
        return await this.followsRepository.delete({
            followerId,
            followingId,
        });
    }
}
