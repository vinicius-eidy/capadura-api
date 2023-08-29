import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { getCountUserFollows } from "./get-count-user-follows";
import { fetchManyUserFollowers } from "./fetch-many-user-followers";
import { fetchManyUserFollowing } from "./fetch-many-user-following";
import { create } from "./create";
import { deleteFollow } from "./delete";
import { getIsCurrentUserFollowingAnUniqueUser } from "./get-is-current-user-following-an-unique-user";

export async function followsRoutes(app: FastifyInstance) {
    app.get("/count-user-follows/:userId", getCountUserFollows);
    app.get("/user-followers/:userId", { onRequest: [verifyJWT] }, fetchManyUserFollowers);
    app.get("/user-following/:userId", { onRequest: [verifyJWT] }, fetchManyUserFollowing);
    app.get(
        "/user-is-following/:followingId",
        { onRequest: [verifyJWT] },
        getIsCurrentUserFollowingAnUniqueUser,
    );

    app.post("/user-followers", { onRequest: [verifyJWT] }, create);

    app.delete(
        "/user-followers/:followerId/:followingId",
        { onRequest: [verifyJWT] },
        deleteFollow,
    );
}
