import { PrismaBookListsRepository } from "@/repositories/prisma/prisma-booklists-repository";
import { FetchBookListsByUserUseCase } from "../fetch-booklists-by-user-use-case";

export function makeFetchBookListsByUserUseCase() {
    const bookListsRepository = new PrismaBookListsRepository();
    const useCase = new FetchBookListsByUserUseCase(bookListsRepository);

    return useCase;
}
