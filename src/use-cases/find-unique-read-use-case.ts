import { Read } from "@prisma/client";
import { ReadsRepository } from "@/repositories/reads-repository";

import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface FindUniqueReadUseCaseRequest {
    readId: string;
}

interface FindUniqueReadUseCaseResponse {
    read: Read;
}

export class FindUniqueReadUseCase {
    constructor(private readsRepository: ReadsRepository) {}

    async execute({
        readId,
    }: FindUniqueReadUseCaseRequest): Promise<FindUniqueReadUseCaseResponse> {
        const read = await this.readsRepository.findUniqueById(readId);

        if (!read) {
            throw new ResourceNotFoundError();
        }

        return {
            read,
        };
    }
}
