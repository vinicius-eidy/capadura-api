import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface FetchManyReadsByBookAndUserUseCaseRequest {
    userId: string;
    bookId?: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    page: number;
    perPage: number;
}

export class FetchManyReadsByBookAndUserUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        userId,
        bookId,
        status,
        page,
        perPage,
    }: FetchManyReadsByBookAndUserUseCaseRequest): Promise<Read[]> {
        const reads = await this.readsRepository.findManyByUserId({
            userId,
            bookId,
            status,
            page,
            perPage,
        });

        return reads;
    }
}
