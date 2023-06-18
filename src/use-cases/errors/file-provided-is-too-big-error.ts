export class FileProvidedIsTooBigError extends Error {
    constructor() {
        super("File provided is too big.");
    }
}
