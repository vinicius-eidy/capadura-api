import { Like } from "@prisma/client";
import { LikesRepository } from "@/repositories/likes-repository";

interface FindLikeByBookAndUserUseCaseRequest {
    bookId: string;
    userId: string;
}

export class FindLikeByBookAndUserUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ bookId, userId }: FindLikeByBookAndUserUseCaseRequest): Promise<Like | null> {
        const like = await this.likesRepository.findUniqueByBookIdAndUserId(bookId, userId);

        return like;
    }
}
