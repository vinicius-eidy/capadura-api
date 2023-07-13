import { ReadsRepository } from "@/repositories/reads-repository";

interface GetBookRatingsUseCaseRequest {
    bookId?: string;
    userId?: string;
}

interface DataRatings {
    rating: number;
    amount: number;
    percentage: number;
}

interface GetBookRatingsUseCaseResponse {
    data: DataRatings[];
    total: number;
    averageRating: number;
}

export class GetBookRatingsUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        bookId,
        userId,
    }: GetBookRatingsUseCaseRequest): Promise<GetBookRatingsUseCaseResponse> {
        const { data, total } = await this.readsRepository.getAllReviewRatings({ bookId, userId });

        const averageRating = calculateAverageRating(data);

        return {
            data,
            total,
            averageRating,
        };
    }
}

function calculateAverageRating(ratings: DataRatings[]): number {
    let totalRating = 0;
    let totalCount = 0;

    for (const item of ratings) {
        totalRating += item.rating * item.amount;
        totalCount += item.amount;
    }

    if (totalCount === 0) {
        return 0; // handle the case when there are no ratings to avoid division by zero.
    }

    const averageRating = totalRating / totalCount;
    return parseFloat(averageRating.toFixed(2));
}
