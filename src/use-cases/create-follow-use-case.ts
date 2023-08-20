import { Follow } from "@prisma/client";
import { FollowsRepository } from "@/repositories/follows-repository";
import { IsNotAllowedToFollowYourself } from "./_errors/is-not-allowed-to-follow-yourself";

interface CreateFollowUseCaseRequest {
    followerId: string;
    followingId: string;
}

export class CreateFollowUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({ followerId, followingId }: CreateFollowUseCaseRequest): Promise<Follow> {
        if (followerId === followingId) {
            throw new IsNotAllowedToFollowYourself();
        }

        const follow = await this.followsRepository.create({
            follower_id: followerId,
            following_id: followingId,
        });

        return follow;
    }
}
