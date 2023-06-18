export class FileUploadError extends Error {
    constructor() {
        super("Failed to upload file.");
    }
}
