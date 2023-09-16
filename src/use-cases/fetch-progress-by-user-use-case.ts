import { ProgressRepository, ProgressWithRead } from "@/repositories/progress-repository";

import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyProgressByUserUseCaseRequest {
    userId: string;
    page: number;
    perPage: number;
}

interface FetchManyProgressByUserUseCaseResponse {
    items: ProgressWithRead[];
    total: number;
}

export class FetchManyProgressByUserUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        userId,
        page,
        perPage,
    }: FetchManyProgressByUserUseCaseRequest): Promise<FetchManyProgressByUserUseCaseResponse> {
        const { progress, total } = await this.progressRepository.findManyByUser({
            userId,
            page,
            perPage,
        });

        progress.forEach((item) => {
            if (item.read.book.image_key) {
                item.read.book.imageUrl = getSignedUrlUtil({ key: item.read.book.image_key });
            }
        });

        return {
            items: progress,
            total: total,
        };
    }
}
