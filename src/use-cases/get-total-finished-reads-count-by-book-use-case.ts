import { ReadsRepository } from "@/repositories/reads-repository";

interface GetTotalFinishedReadsCountByBookUseCaseRequest {
    bookId: string;
}

interface GetTotalFinishedReadsCountByBookUseCaseResponse {
    total: number;
}

export class GetTotalFinishedReadsCountByBookUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        bookId,
    }: GetTotalFinishedReadsCountByBookUseCaseRequest): Promise<GetTotalFinishedReadsCountByBookUseCaseResponse> {
        const total = await this.readsRepository.getTotalFinishedReadsCountByBook(bookId);

        return {
            total,
        };
    }
}
