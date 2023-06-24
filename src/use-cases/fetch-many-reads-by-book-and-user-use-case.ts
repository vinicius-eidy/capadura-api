import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface FetchManyReadsByBookAndUserUseCaseRequest {
    userId: string;
    bookId: string;
}

export class FetchManyReadsByBookAndUserUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({ userId, bookId }: FetchManyReadsByBookAndUserUseCaseRequest): Promise<Read[]> {
        const reads = await this.readsRepository.findManyByBookByUserId({
            userId,
            bookId,
        });

        return reads;
    }
}
