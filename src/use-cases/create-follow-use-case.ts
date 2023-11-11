import { Follow } from "@prisma/client";
import { FollowsRepository } from "@/repositories/follows-repository";

interface CreateFollowUseCaseRequest {
    followerId: string;
    followingId: string;
}

export class CreateFollowUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({ followerId, followingId }: CreateFollowUseCaseRequest): Promise<Follow> {
        if (followerId === followingId) {
            throw new Error("Is not allowed to follow yourself.");
        }

        const follow = await this.followsRepository.create({
            follower_id: followerId,
            following_id: followingId,
        });

        return follow;
    }
}
