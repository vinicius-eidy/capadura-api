import { Redis } from "ioredis";

import { env } from "@/env";

const getRedisUrl = () => {
    if (env.REDIS_URL) {
        return env.REDIS_URL;
    }

    throw new Error("REDIS_URL is not defined.");
};

export const redis = new Redis(getRedisUrl());

redis.on("error", function (error) {
    console.error("[REDIS ERROR]: " + error);
});

export const getRedis = async <T>(key: string): Promise<T | null> => {
    try {
        const data = await redis.get(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error getting data from Redis:", error);
        return null;
    }
};

export const setRedis = async (key: string, value: any): Promise<void> => {
    try {
        const stringValue = JSON.stringify(value);
        await redis.set(key, stringValue, "EX", 60 * 60 * 2); // 2 hours
    } catch (error) {
        console.error("Error setting data in Redis:", error);
    }
};
