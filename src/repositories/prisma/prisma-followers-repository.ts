import { Follow, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
    FollowsRepository,
    DeleteFollow,
    FindManyFollowsByUser,
    GetIsCurrentUserFollowingAnUniqueUser,
    FindManyUserFollowingResponse,
    FindManyUserFollowersResponse,
} from "../follows-repository";

export class PrismaFollowsRepository implements FollowsRepository {
    async findManyUserFollowers({ userId, currentUserId, page, perPage }: FindManyFollowsByUser) {
        const userFollowers: FindManyUserFollowersResponse[] = await prisma.$queryRaw(Prisma.sql`
            SELECT
                f.*,
                json_build_object(
                    'name', u_follower.name,
                    'username', u_follower.username,
                    'image_key', u_follower.image_key
                ) AS follower,
                CASE
                    WHEN EXISTS (
                        SELECT 1
                        FROM follows AS f2
                        WHERE f2.follower_id = ${currentUserId}
                        AND f2.following_id = f.follower_id
                    ) THEN true
                    ELSE false
                END AS is_followed_by_current_user
            FROM follows AS f
            JOIN users AS u_follower ON f.follower_id = u_follower.id
            WHERE f.following_id = ${userId}
            ORDER BY f.follower_id
            LIMIT ${perPage}
            OFFSET ${(page - 1) * perPage}
        `);

        return userFollowers;
    }

    async findManyUserFollowing({ userId, currentUserId, page, perPage }: FindManyFollowsByUser) {
        const userFollowing: FindManyUserFollowingResponse[] = await prisma.$queryRaw(Prisma.sql`
            SELECT
                f.*,
                json_build_object(
                    'id', u_following.id,
                    'name', u_following.name,
                    'username', u_following.username,
                    'image_key', u_following.image_key
                ) AS following,
                CASE
                    WHEN EXISTS (
                        SELECT 1
                        FROM follows AS f2
                        WHERE f2.follower_id = ${currentUserId}
                        AND f2.following_id = f.following_id
                    ) THEN true
                    ELSE false
                END AS is_followed_by_current_user
            FROM follows AS f
            JOIN users AS u_following ON f.following_id = u_following.id
            WHERE f.follower_id = ${userId}
            ORDER BY f.follower_id
            LIMIT ${perPage}
            OFFSET ${(page - 1) * perPage}
        `);

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
