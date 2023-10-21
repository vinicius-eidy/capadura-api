import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FetchManyReadsByReviewRatingsAndBookUseCase } from "@/use-cases/fetch-many-reads-by-review-ratings-and-book-use-case";

export function makeFetchManyReadsByReviewRatingsAndBookUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FetchManyReadsByReviewRatingsAndBookUseCase(readsRepository);

    return useCase;
}
