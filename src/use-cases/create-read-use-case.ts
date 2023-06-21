import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

interface CreateReadUseCaseRequest {
    userId: string;
    bookId: string;
}

export class CreateReadUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({ userId, bookId }: CreateReadUseCaseRequest): Promise<Read> {
        const read = await this.readsRepository.create({
            book_id: bookId,
            user_id: userId,
            status: "ACTIVE",
            is_private: false,
        });

        return read;
    }
}
