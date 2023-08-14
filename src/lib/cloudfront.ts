import { CloudFrontClient } from "@aws-sdk/client-cloudfront";
import { env } from "@/env";

export const cloudFront = new CloudFrontClient({
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    region: env.S3_BUCKET_REGION,
});
