import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { env } from "@/env";

interface getSignedUrlUtilProps {
    key: string;
    dateLessThan?: number;
}

const DEFAULT_EXPIRES_DATE_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days,

export function getSignedUrlUtil({
    key,
    dateLessThan = DEFAULT_EXPIRES_DATE_TIME,
}: getSignedUrlUtilProps) {
    return getSignedUrl({
        url: env.CLOUDFRONT_BASE_URL + key,
        dateLessThan: `${new Date(Date.now() + dateLessThan)}`,
        privateKey: env.CLOUDFRONT_PRIVATE_KEY,
        keyPairId: env.CLOUDFRONT_KEY_PAIR_ID,
    });
}
