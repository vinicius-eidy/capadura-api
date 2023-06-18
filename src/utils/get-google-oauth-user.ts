import axios from "axios";
import { EmailNotVerifiedError } from "@/use-cases/errors/email-not-verified-error";

interface GoogleOAuthUserRequest {
    id_token: string;
    access_token: string;
}

export interface GoogleOAuthUserResponse {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export async function getGoogleOAuthUser({ id_token, access_token }: GoogleOAuthUserRequest) {
    try {
        const response = await axios.get<GoogleOAuthUserResponse>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            },
        );

        if (!response.data.verified_email) {
            throw new EmailNotVerifiedError();
        }

        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unexpected error on trying to get Google OAuth User.");
        }
    }
}
