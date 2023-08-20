import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
    FollowsRepository,
    DeleteFollow,
    FindManyFollowsByUser,
    GetIsCurrentUserFollowingAnUniqueUser,
} from "../follows-repository";

export class PrismaFollowsRepository implements FollowsRepository {
    async findManyUserFollowers({ userId, page, perPage }: FindManyFollowsByUser) {
        const userFollowers = await prisma.follow.findMany({
            where: {
                following_id: userId,
            },
            orderBy: {
                follower: {
                    username: "asc",
                },
            },
            include: {
                follower: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image_key: true,
                    },
                },
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });

        return userFollowers;
    }

    async findManyUserFollowing({ userId, page, perPage }: FindManyFollowsByUser) {
        const userFollowing = await prisma.follow.findMany({
            where: {
                follower_id: userId,
            },
            orderBy: {
                follower: {
                    username: "asc",
                },
            },
            include: {
                following: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image_key: true,
                    },
                },
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });

        return userFollowing;
    }

    async getCountUserFollows(userId: string) {
        const userFollowersPromise = prisma.follow.count({
            where: {
                following_id: userId,
            },
        });

        const userFollowingPromise = prisma.follow.count({
            where: {
                follower_id: userId,
            },
        });

        const [followers, following] = await Promise.all([
            userFollowersPromise,
            userFollowingPromise,
        ]);

        return {
            followers,
            following,
        };
    }

    async getIsCurrentUserFollowingAnUniqueUser({
        currentUserId,
        followingId,
    }: GetIsCurrentUserFollowingAnUniqueUser) {
        const follow = await prisma.follow.findFirst({
            where: {
                follower_id: currentUserId,
                following_id: followingId,
            },
        });

        return {
            isFollowing: !!follow,
        };
    }

    async delete({ followerId, followingId }: DeleteFollow) {
        await prisma.follow.delete({
            where: {
                follower_id_following_id: {
                    follower_id: followerId,
                    following_id: followingId,
                },
            },
        });

        return;
    }

    async create(data: Prisma.FollowUncheckedCreateInput) {
        const follow = await prisma.follow.create({
            data,
        });

        return follow;
    }
}
