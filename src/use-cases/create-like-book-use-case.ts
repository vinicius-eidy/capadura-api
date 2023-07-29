import { Like } from "@prisma/client";
import { LikesRepository } from "@/repositories/likes-repository";

interface CreateLikeBookUseCaseRequest {
    bookId: string;
    userId: string;
}

export class CreateLikeBookUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ bookId, userId }: CreateLikeBookUseCaseRequest): Promise<Like> {
        const like = await this.likesRepository.create({
            book_id: bookId,
            user_id: userId,
        });

        return like;
    }
}
