import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { GetBookRatingsUseCase } from "../get-book-ratings-use-case";

export function makeGetBookRatingsUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new GetBookRatingsUseCase(readsRepository);

    return useCase;
}
