import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyReadsByBookUseCaseRequest {
    bookId: string;
    page: number;
    perPage: number;
}

interface FetchManyReadsByBookUseCaseResponse {
    items: Read[];
    total: number;
}

export class FetchManyReadsByBookUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        bookId,
        page,
        perPage,
    }: FetchManyReadsByBookUseCaseRequest): Promise<FetchManyReadsByBookUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyByBookId({
            bookId,
            page,
            perPage,
        });

        reads.forEach((read) => {
            if (read.user?.image_key) {
                read.user.imageUrl = getSignedUrlUtil({ key: read.user.image_key });
            }
        });

        return { items: reads, total };
    }
}
