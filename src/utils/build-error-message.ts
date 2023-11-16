interface buildErrorMessageProps {
    err: unknown;
    prefix: string;
}

export function buildErrorMessage({ err, prefix }: buildErrorMessageProps) {
    if (err instanceof Error) {
        if (err.name === "ZodError") {
            throw err;
        }

        err.message = prefix + err.message;
        throw err;
    }

    throw new Error(prefix + `Unexpected error type: ${typeof err}: ${err}`);
}
