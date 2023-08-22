import {
    FindManyUserFollowingResponse,
    FollowsRepository,
} from "@/repositories/follows-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyUserFollowingUseCaseRequest {
    userId: string;
    currentUserId?: string;
    page: number;
    perPage: number;
}

export class FetchManyUserFollowingUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({
        userId,
        currentUserId,
        page,
        perPage,
    }: FetchManyUserFollowingUseCaseRequest): Promise<FindManyUserFollowingResponse[]> {
        const follows = await this.followsRepository.findManyUserFollowing({
            userId,
            currentUserId,
            page,
            perPage,
        });

        follows.forEach((follow) => {
            if (follow.following.image_key) {
                follow.following.imageUrl = getSignedUrlUtil({ key: follow.following.image_key });
            }
        });

        return follows;
    }
}
