import { Follow } from "@prisma/client";
import { FollowsRepository } from "@/repositories/follows-repository";

interface FetchManyUserFollowersUseCaseRequest {
    userId: string;
    page: number;
    perPage: number;
}

export class FetchManyUserFollowersUseCase {
    constructor(private followsRepository: FollowsRepository) {}

    async execute({
        userId,
        page,
        perPage,
    }: FetchManyUserFollowersUseCaseRequest): Promise<Follow[]> {
        const follows = await this.followsRepository.findManyUserFollowers({
            userId,
            page,
            perPage,
        });

        return follows;
    }
}
