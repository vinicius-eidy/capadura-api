import { Follow, Prisma, User } from "@prisma/client";
import {
    FollowsRepository,
    DeleteFollow,
    FindManyFollowsByUser,
    GetIsCurrentUserFollowingAnUniqueUser,
} from "../follows-repository";

export class InMemoryFollowsRepository implements FollowsRepository {
    public items: (Follow & {
        follower?: User;
        following?: User;
    })[] = [];

    async findManyUserFollowers({ userId, page, perPage }: FindManyFollowsByUser) {
        const follows = this.items
            .filter((item) => item.following_id === userId)
            .slice((page - 1) * perPage, page * perPage);

        follows.forEach((item) => {
            item.follower === undefined;
        });

        return follows;
    }

    async findManyUserFollowing({ userId, page, perPage }: FindManyFollowsByUser) {
        const follows = this.items
            .filter((item) => item.follower_id === userId)
            .slice((page - 1) * perPage, page * perPage);

        follows.forEach((item) => {
            item.following === undefined;
        });

        return follows;
    }

    async getCountUserFollows(userId: string) {
        const followers = this.items.filter((item) => item.following_id === userId).length;
        const following = this.items.filter((item) => item.follower_id === userId).length;

        return {
            followers,
            following,
        };
    }

    async getIsCurrentUserFollowingAnUniqueUser({
        currentUserId,
        followingId,
    }: GetIsCurrentUserFollowingAnUniqueUser) {
        const isFollowing = this.items.some((item) => {
            return item.follower_id === currentUserId && item.following_id === followingId;
        });

        return {
            isFollowing,
        };
    }

    async delete({ followerId, followingId }: DeleteFollow) {
        this.items = this.items.filter((item) => {
            return item.follower_id !== followerId && item.following_id !== followingId;
        });

        return;
    }

    async create(data: Prisma.FollowUncheckedCreateInput) {
        const { follower_id, following_id } = data;
        const follow = {
            follower_id,
            following_id,
        };

        this.items.push(follow);

        return follow;
    }
}
