import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyReadsByReviewRatingsAndUserUseCaseRequest {
    userId: string;
    rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    page: number;
    perPage: number;
}

interface FetchManyReadsByReviewRatingsAndUserUseCaseResponse {
    items: Read[];
    total: number;
}

export class FetchManyReadsByReviewRatingsAndUserUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        userId,
        rating,
        page,
        perPage,
    }: FetchManyReadsByReviewRatingsAndUserUseCaseRequest): Promise<FetchManyReadsByReviewRatingsAndUserUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyByReviewRatingsAndUser({
            userId,
            rating,
            page,
            perPage,
        });

        reads.forEach((read) => {
            if (read.book?.image_key) {
                read.book.imageUrl = getSignedUrlUtil({ key: read.book.image_key });
            }
        });

        return { items: reads, total };
    }
}
