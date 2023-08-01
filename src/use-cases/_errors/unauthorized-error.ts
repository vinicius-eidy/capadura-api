export class UnauthorizedError extends Error {
    constructor() {
        super("User do not have permission.");
    }
}
