import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    BASE_URL_FRONT_END: z.string().default("http://localhost:3000"),

    JWT_SECRET: z.string(),

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
