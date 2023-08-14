import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";

import { env } from "@/env";
import { S3 } from "@/lib/s3";

export async function putS3Object({
    Bucket = env.S3_BUCKET_NAME,
    Key,
    Body,
    ContentType,
}: PutObjectCommandInput) {
    const params = {
        Bucket: Bucket,
        Key: Key,
        Body: Body,
        ContentType: ContentType,
    };
    const command = new PutObjectCommand(params);
    await S3.send(command);
}
