import { Follow, Prisma } from "@prisma/client";

export interface FindManyFollowsByUser {
    userId: string;
    currentUserId?: string;
    page: number;
    perPage: number;
}

export interface FindManyUserFollowersResponse extends Follow {
    is_followed_by_current_user: boolean;
    follower: {
        name: string;
        username: string;
        image_key: string;
        imageUrl?: string;
    };
}

export interface FindManyUserFollowingResponse extends Follow {
    is_followed_by_current_user: boolean;
    following: {
        name: string;
        username: string;
        image_key: string;
        imageUrl?: string;
    };
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
    findManyUserFollowers({
        userId,
        currentUserId,
        page,
        perPage,
    }: FindManyFollowsByUser): Promise<FindManyUserFollowersResponse[]>;
    findManyUserFollowing({
        userId,
        currentUserId,
        page,
        perPage,
    }: FindManyFollowsByUser): Promise<FindManyUserFollowingResponse[]>;
    getCountUserFollows(userId: string): Promise<GetCountUserFollowsResponse>;
    getIsCurrentUserFollowingAnUniqueUser({
        currentUserId,
        followingId,
    }: GetIsCurrentUserFollowingAnUniqueUser): Promise<GetIsCurrentUserFollowingAnUniqueUserResponse>;
    delete({ followerId, followingId }: DeleteFollow): Promise<void>;
    create(data: Prisma.FollowUncheckedCreateInput): Promise<Follow>;
}
