import { Follow, Prisma } from "@prisma/client";

export interface FindManyFollowsByUser {
    userId: string;
    page: number;
    perPage: number;
}

export interface GetCountUserFollowsResponse {
    followers: number;
    following: number;
}

export interface GetIsCurrentUserFollowingAnUniqueUser {
    currentUserId: string;
    followingId: string;
}

interface GetIsCurrentUserFollowingAnUniqueUserResponse {
    isFollowing: boolean;
}

export interface DeleteFollow {
    followerId: string;
    followingId: string;
}

export interface FollowsRepository {
    findManyUserFollowers({ userId, page, perPage }: FindManyFollowsByUser): Promise<Follow[]>;
    findManyUserFollowing({ userId, page, perPage }: FindManyFollowsByUser): Promise<Follow[]>;
    getCountUserFollows(userId: string): Promise<GetCountUserFollowsResponse>;
    getIsCurrentUserFollowingAnUniqueUser({
        currentUserId,
        followingId,
    }: GetIsCurrentUserFollowingAnUniqueUser): Promise<GetIsCurrentUserFollowingAnUniqueUserResponse>;
    delete({ followerId, followingId }: DeleteFollow): Promise<void>;
    create(data: Prisma.FollowUncheckedCreateInput): Promise<Follow>;
}
