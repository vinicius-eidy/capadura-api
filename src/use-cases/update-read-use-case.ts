import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";
import { UnauthorizedError } from "./_errors/unauthorized-error";

interface UpdateReadUseCaseRequest {
    readId: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    isPrivate?: boolean;
    reviewRating?: number;
    reviewContent?: string;
    reviewIsSpoiler?: boolean;
    endRead: boolean;
    userId: string;
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
        endRead,
        userId,
    }: UpdateReadUseCaseRequest): Promise<Read | undefined> {
        const readToUpdate = await this.readsRepository.findUniqueById(readId);

        if (!readToUpdate) {
            throw new ResourceNotFoundError();
        }

        if (readToUpdate.user_id !== userId) {
            throw new UnauthorizedError();
        }

        const read = await this.readsRepository.update({
            id: readId,
            status,
            is_private: isPrivate,
            review_rating: reviewRating,
            review_content: reviewContent,
            review_is_spoiler: reviewIsSpoiler,
            end_date: endRead ? new Date() : undefined,
        });

        return read;
    }
}
