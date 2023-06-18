import { env } from "@/env";
import AWS from "aws-sdk";

// @ts-ignore
import AWSMaintenanceMode from "aws-sdk/lib/maintenance_mode_message";
AWSMaintenanceMode.suppress = true;

export const s3 = new AWS.S3({
    httpOptions: {
        timeout: 1000 * 60, // 60 seconds
    },
    signatureVersion: "v2",
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: "sa-east-1",
});
