import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyReadsByReviewRatingsAndBookUseCaseRequest {
    bookId: string;
    rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    page: number;
    perPage: number;
}

interface FetchManyReadsByReviewRatingsAndBookUseCaseResponse {
    items: Read[];
    total: number;
}

export class FetchManyReadsByReviewRatingsAndBookUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        bookId,
        rating,
        page,
        perPage,
    }: FetchManyReadsByReviewRatingsAndBookUseCaseRequest): Promise<FetchManyReadsByReviewRatingsAndBookUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyByReviewRatingsAndBook({
            bookId,
            rating,
            page,
            perPage,
        });

        reads.forEach((read) => {
            if (read.book?.image_key) {
                read.book.imageUrl = getSignedUrlUtil({ key: read.book.image_key });
            }

            if (read.user?.image_key) {
                read.user.imageUrl = getSignedUrlUtil({ key: read.user.image_key });
            }
        });

        return { items: reads, total };
    }
}
