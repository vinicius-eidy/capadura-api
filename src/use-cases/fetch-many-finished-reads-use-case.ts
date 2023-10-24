import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyFinishedReadsUseCaseRequest {
    page: number;
    perPage: number;
}

interface FetchManyFinishedReadsUseCaseResponse {
    items: Read[];
    total: number;
}

export class FetchManyFinishedReadsUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        page,
        perPage,
    }: FetchManyFinishedReadsUseCaseRequest): Promise<FetchManyFinishedReadsUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyFinishedReads({
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
