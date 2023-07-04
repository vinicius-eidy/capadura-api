import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface UpdateReadUseCaseRequest {
    readId: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    isPrivate?: boolean;
    reviewRating?: number;
    reviewContent?: string;
    reviewIsSpoiler?: boolean;
}

export class UpdateReadUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        readId,
        status,
        isPrivate,
        reviewRating,
        reviewContent,
        reviewIsSpoiler,
    }: UpdateReadUseCaseRequest): Promise<Read | undefined> {
        const read = await this.readsRepository.update({
            id: readId,
            status,
            is_private: isPrivate,
            review_rating: reviewRating,
            review_content: reviewContent,
            review_is_spoiler: reviewIsSpoiler,
        });

        return read;
    }
}
