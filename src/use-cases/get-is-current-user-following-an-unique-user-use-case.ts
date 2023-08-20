import { FollowsRepository } from "@/repositories/follows-repository";

interface GetIsCurrentUserFollowingAnUniqueUserUseCaseRequest {
    currentUserId: string;
    followingId: string;
}

interface GetIsCurrentUserFollowingAnUniqueUserUseCaseResponse {
    isFollowing: boolean;
}

export class GetIsCurrentUserFollowingAnUniqueUserUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({
        currentUserId,
        followingId,
    }: GetIsCurrentUserFollowingAnUniqueUserUseCaseRequest): Promise<GetIsCurrentUserFollowingAnUniqueUserUseCaseResponse> {
        const { isFollowing } = await this.followsRepository.getIsCurrentUserFollowingAnUniqueUser({
            currentUserId,
            followingId,
        });

        return {
            isFollowing,
        };
    }
}
