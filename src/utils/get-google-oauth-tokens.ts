import axios from "axios";
import qs from "qs";
import { env } from "@/env";

interface GoogleTokensResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function getGoogleOAuthTokens(code: string) {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_SECRET_ID,
        redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: "authorization_code",
    };

    try {
        const response = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error(error.response.data.error);
        throw new Error(error.message);
    }
}
