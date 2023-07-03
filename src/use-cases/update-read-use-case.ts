import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface UpdateReadUseCaseRequest {
    readId: string;
    status?: "ACTIVE" | "FINISHED" | "CANCELLED" | "DELETED";
    isPrivate?: boolean;
}

export class UpdateReadUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({ readId, status, isPrivate }: UpdateReadUseCaseRequest): Promise<Read> {
        const read = await this.readsRepository.update({
            id: readId,
            status,
            is_private: isPrivate,
        });

        return read;
    }
}
