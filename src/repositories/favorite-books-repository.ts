import { FavoriteBook, Prisma } from "@prisma/client";

export interface FavoriteBooksRepository {
    findUnique(favoriteBookId: string): Promise<FavoriteBook | null>;
    findManyByUserId(userId: string): Promise<FavoriteBook[]>;
    update(data: Prisma.FavoriteBookUpdateInput): Promise<FavoriteBook>;
    delete(favoriteBookId: string): Promise<void>;
    create(data: Prisma.FavoriteBookUncheckedCreateInput): Promise<FavoriteBook>;
}
