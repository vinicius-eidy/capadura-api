import { CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

import { env } from "@/env";
import { cloudFront } from "@/lib/cloudfront";

interface invalidateCloudFrontCacheProps {
    key: string;
}

export async function invalidateCloudFrontCache({ key }: invalidateCloudFrontCacheProps) {
    const invalidationParams = {
        DistributionId: env.CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
            CallerReference: key,
            Paths: {
                Quantity: 1,
                Items: ["/" + key],
            },
        },
    };

    const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
    await cloudFront.send(invalidationCommand);
}
