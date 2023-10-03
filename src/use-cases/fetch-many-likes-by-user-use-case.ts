import { Like } from "@prisma/client";
import { LikesRepository } from "@/repositories/likes-repository";

import { getSignedUrlUtil } from "@/utils/get-signed-url";

interface FetchManyLikesByUserUseCaseRequest {
    userId: string;
}

interface FetchManyLikesByUserUseCaseResponse {
    likes: Like[];
}

export class FetchManyLikesByUserUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({
        userId,
    }: FetchManyLikesByUserUseCaseRequest): Promise<FetchManyLikesByUserUseCaseResponse> {
        const likes = await this.likesRepository.findManyByUserId(userId);

        likes.forEach((like) => {
            if (like.book.image_key) {
                like.book.imageUrl = getSignedUrlUtil({ key: like.book.image_key });
            }
        });

        return {
            likes: likes || [],
        };
    }
}
