import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { getCountUserFollows } from "./get-count-user-follows";
import { fetchManyUserFollowers } from "./fetch-many-user-followers";
import { fetchManyUserFollowing } from "./fetch-many-user-following";
import { create } from "./create";
import { deleteFollow } from "./delete";
import { getIsCurrentUserFollowingAnUniqueUser } from "./get-is-current-user-following-an-unique-user";

export async function followsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/count-user-follows/:userId", getCountUserFollows);
    app.get("/user-followers/:userId/:currentUserId?", fetchManyUserFollowers);
    app.get("/user-following/:userId/:currentUserId?", fetchManyUserFollowing);
    app.get("/user-is-following/:followingId", getIsCurrentUserFollowingAnUniqueUser);

    app.post("/user-followers", create);

    app.delete("/user-followers/:followerId/:followingId", deleteFollow);
}
