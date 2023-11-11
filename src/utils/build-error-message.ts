interface buildErrorMessageProps {
    err: unknown;
    prefix: string;
}

export function buildErrorMessage({ err, prefix }: buildErrorMessageProps) {
    if (err instanceof Error) {
        throw new Error(prefix + err.message);
    }

    throw new Error(prefix + `Unexpected error type: ${typeof err}: ${err}`);
}
