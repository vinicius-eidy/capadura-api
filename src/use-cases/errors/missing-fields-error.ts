export class MissingFieldsError extends Error {
    constructor() {
        super("The request is incomplete: missing fields.");
    }
}
