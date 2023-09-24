import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyReadsByBookAndUserUseCaseRequest {
    userId: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    page: number;
    perPage: number;
}

interface FetchManyReadsByBookAndUserUseCaseResponse {
    items: Read[];
    total: number;
}

export class FetchManyReadsByBookAndUserUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        userId,
        status,
        page,
        perPage,
    }: FetchManyReadsByBookAndUserUseCaseRequest): Promise<FetchManyReadsByBookAndUserUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyByUserId({
            userId,
            status,
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
