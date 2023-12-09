import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface FetchManyReadsByUserForUniqueBookUseCaseRequest {
    userId: string;
    bookId: string;
}

interface FetchManyReadsByUserForUniqueBookUseCaseResponse {
    items: Read[];
    total: number;
}

export class FetchManyReadsByUserForUniqueBookUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        userId,
        bookId,
    }: FetchManyReadsByUserForUniqueBookUseCaseRequest): Promise<FetchManyReadsByUserForUniqueBookUseCaseResponse> {
        const { reads, total } = await this.readsRepository.findManyByUserIdForUniqueBook({
            userId,
            bookId,
        });

        return { items: reads, total };
    }
}
