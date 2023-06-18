export class RequestToExternalAPIError extends Error {
    constructor() {
        super("Failed to request external API.");
    }
}
