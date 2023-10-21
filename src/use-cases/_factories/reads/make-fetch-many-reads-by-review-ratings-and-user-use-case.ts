import { PrismaReadRepository } from "@/repositories/prisma/prisma-reads-repository";
import { FetchManyReadsByReviewRatingsAndUserUseCase } from "@/use-cases/fetch-many-reads-by-review-ratings-and-user-use-case";

export function makeFetchManyReadsByReviewRatingsAndUserUseCase() {
    const readsRepository = new PrismaReadRepository();
    const useCase = new FetchManyReadsByReviewRatingsAndUserUseCase(readsRepository);

    return useCase;
}
