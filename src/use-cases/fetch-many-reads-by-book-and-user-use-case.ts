import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface FetchManyReadsByBookAndUserUseCaseRequest {
    userId: string;
    bookId: string;
    page: number;
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
        page,
    }: FetchManyReadsByBookAndUserUseCaseRequest): Promise<FetchManyReadsByBookAndUserUseCaseResponse> {
        const { items, total } = await this.readsRepository.findManyByBookByUserId({
            userId,
            bookId,
            page,
        });

        return {
            items,
            total,
        };
    }
}
