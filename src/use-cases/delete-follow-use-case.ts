import { FollowsRepository } from "@/repositories/follows-repository";

import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteFollowUseCaseRequest {
    followerId: string;
    followingId: string;
    userId: string;
}

export class DeleteFollowUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({ followerId, followingId, userId }: DeleteFollowUseCaseRequest): Promise<void> {
        if (followerId !== userId) {
            throw new UnauthorizedError();
        }

        return await this.followsRepository.delete({
            followerId,
            followingId,
        });
    }
}
