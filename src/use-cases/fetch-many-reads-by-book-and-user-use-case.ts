import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyReadsByBookAndUserUseCaseRequest {
    userId: string;
    bookId?: string;
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
        bookId,
        status,
        page,
        perPage,
    }: FetchManyReadsByBookAndUserUseCaseRequest): Promise<FetchManyReadsByBookAndUserUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyByUserId({
            userId,
            bookId,
            status,
            page,
            perPage,
        });

        reads.forEach((item) => {
            if (item.book.image_key) {
                item.book.imageUrl = getSignedUrlUtil({ key: item.book.image_key });
            }
        });

        return { items: reads, total };
    }
}
