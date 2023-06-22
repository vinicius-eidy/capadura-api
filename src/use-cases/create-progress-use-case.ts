import { Progress } from "@prisma/client";
import { ProgressRepository } from "@/repositories/progress-repository";

interface CreateProgressUseCaseRequest {
    description?: string;
    is_spoiler: boolean;
    page?: number;
    percentage?: number;
    readId: string;
}

export class CreateProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute({
        description,
        is_spoiler,
        page,
        percentage,
        readId,
    }: CreateProgressUseCaseRequest): Promise<Progress> {
        const read = await this.progressRepository.create({
            description,
            is_spoiler,
            page,
            percentage,
            read_id: readId,
        });

        return read;
    }
}
