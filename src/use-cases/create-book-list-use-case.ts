import { BookList } from "@prisma/client";
import { BookListsRepository } from "@/repositories/book-lists-repository";
import sharp from "sharp";
import { putS3Object } from "@/utils/put-s3-object";
import { env } from "@/env";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface CreateBookListUseCaseRequest {
    name: string;
    description?: string;
    imageBuffer?: Buffer;
    userId: string;
}

interface BookListWithImageUrl extends BookList {
    imageUrl?: string;
}

export class CreateBookListUseCase {
    constructor(private booksListsRepository: BookListsRepository) {}

    async execute({
        name,
        description,
        imageBuffer,
        userId,
    }: CreateBookListUseCaseRequest): Promise<BookListWithImageUrl> {
        const bookList = await this.booksListsRepository.create({
            name,
            description,
            user_id: userId,
        });

        const bookListImageKey = `booklist-${bookList.id}`;

        if (imageBuffer) {
            // upload new image in S3
            const updatedBuffer = await sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();

            await putS3Object({
                Bucket: env.S3_BUCKET_NAME,
                Key: bookListImageKey,
                Body: updatedBuffer,
                ContentType: "image/jpeg",
            });

            await this.booksListsRepository.update({
                id: bookList.id,
                image_key: bookListImageKey,
            });
        }

        let imageUrl;
        if (imageBuffer) {
            imageUrl = getSignedUrlUtil({ key: bookListImageKey });
        }

        const bookListWithImageUrl = {
            ...bookList,
            imageUrl,
        };

        return bookListWithImageUrl;
    }
}
