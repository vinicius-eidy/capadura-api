import { FollowsRepository, GetCountUserFollowsResponse } from "@/repositories/follows-repository";

interface GetCountUserFollowsUseCaseRequest {
    userId: string;
}

export class GetCountUserFollowsUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({
        userId,
    }: GetCountUserFollowsUseCaseRequest): Promise<GetCountUserFollowsResponse> {
        const { followers, following } = await this.followsRepository.getCountUserFollows(userId);

        return {
            followers,
            following,
        };
    }
}
