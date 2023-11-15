import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    DOMAIN: z.string().default("127.0.0.1"),
    BASE_URL_FRONT_END: z.string().default("http://127.0.0.1:3000"),

    S3_BUCKET_NAME: z.string(),
    S3_BUCKET_REGION: z.string(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),

    CLOUDFRONT_BASE_URL: z.string(),
    CLOUDFRONT_DISTRIBUTION_ID: z.string(),
    CLOUDFRONT_PRIVATE_KEY: z.string(),
    CLOUDFRONT_KEY_PAIR_ID: z.string(),

    JWT_SECRET: z.string(),

    DATABASE_URL: z.string(),
    REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
    REDIS_PASSWORD: z.string().default("pwd"),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_SECRET_ID: z.string(),
    GOOGLE_OAUTH_REDIRECT_URL: z.string(),

    PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("❌ Invalid environment variables", _env.error.format());

    throw new Error("Invalid environment variables.");
}

export const env = _env.data;
