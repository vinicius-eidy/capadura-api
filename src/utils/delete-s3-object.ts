import { DeleteObjectCommand, DeleteObjectCommandInput } from "@aws-sdk/client-s3";

import { env } from "@/env";
import { S3 } from "@/lib/s3";

export async function deleteS3Object({
    Bucket = env.S3_BUCKET_NAME,
    Key,
}: DeleteObjectCommandInput) {
    const params = {
        Bucket,
        Key,
    };

    const command = new DeleteObjectCommand(params);
    await S3.send(command);
}
