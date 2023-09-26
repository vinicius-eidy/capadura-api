import { LikesRepository } from "@/repositories/likes-repository";

interface GetTotalLikeCountByBookUseCaseRequest {
    bookId: string;
}

interface GetTotalLikeCountByBookUseCaseResponse {
    total: number;
}

export class GetTotalLikeCountByBookUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({
        bookId,
    }: GetTotalLikeCountByBookUseCaseRequest): Promise<GetTotalLikeCountByBookUseCaseResponse> {
        try {
            const count = await this.likesRepository.getTotalCountByBook(bookId);

            return {
                total: count,
            };
        } catch (err) {
            throw err;
        }
    }
}
