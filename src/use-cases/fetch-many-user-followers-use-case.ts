import {
    FindManyUserFollowersResponse,
    FollowsRepository,
} from "@/repositories/follows-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyUserFollowersUseCaseRequest {
    userId: string;
    currentUserId?: string;
    page: number;
    perPage: number;
}

export class FetchManyUserFollowersUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({
        userId,
        currentUserId,
        page,
        perPage,
    }: FetchManyUserFollowersUseCaseRequest): Promise<FindManyUserFollowersResponse[]> {
        const follows = await this.followsRepository.findManyUserFollowers({
            userId,
            currentUserId,
            page,
            perPage,
        });

        follows.forEach((follow) => {
            if (follow.follower.image_key) {
                follow.follower.imageUrl = getSignedUrlUtil({ key: follow.follower.image_key });
            }
        });

        return follows;
    }
}
