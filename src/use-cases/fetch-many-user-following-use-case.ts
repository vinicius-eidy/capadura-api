import { Follow } from "@prisma/client";
import { FollowsRepository } from "@/repositories/follows-repository";

interface FetchManyUserFollowingUseCaseRequest {
    userId: string;
    page: number;
    perPage: number;
}

export class FetchManyUserFollowingUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({
        userId,
        page,
        perPage,
    }: FetchManyUserFollowingUseCaseRequest): Promise<Follow[]> {
        const follows = await this.followsRepository.findManyUserFollowing({
            userId,
            page,
            perPage,
        });

        return follows;
    }
}
