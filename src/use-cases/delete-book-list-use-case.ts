import { env } from "@/env";
import { invalidateCloudFrontCache } from "@/utils/invalidate-cloudfront-cache";
import { deleteS3Object } from "@/utils/delete-s3-object";

import { BookListsRepository } from "@/repositories/book-lists-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface DeleteBookListUseCaseRequest {
    bookListId: string;
    userId: string;
}

export class DeleteBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({ bookListId, userId }: DeleteBookListUseCaseRequest): Promise<void> {
        try {
            const existentBookList = await this.booksListsRepository.findUniqueById(bookListId);

            if (!existentBookList) {
                throw new ResourceNotFoundError();
            }

            if (existentBookList.user_id !== userId) {
                throw new UnauthorizedError();
            }

            if (existentBookList.image_key) {
                await invalidateCloudFrontCache({ key: existentBookList.image_key });
                await deleteS3Object({
                    Bucket: env.S3_BUCKET_NAME,
                    Key: existentBookList.image_key,
                });
            }

            return await this.booksListsRepository.delete(bookListId);
        } catch (err) {
            throw err;
        }
    }
}
