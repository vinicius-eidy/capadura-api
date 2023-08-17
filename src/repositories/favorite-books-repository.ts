import { Book, FavoriteBook, Prisma } from "@prisma/client";

interface BookWithImageUrl extends Book {
    imageUrl?: string;
}

export interface FavoriteBooksWithBookAndBookImageUrl extends FavoriteBook {
    book: BookWithImageUrl;
}

export interface FavoriteBooksRepository {
    findUnique(favoriteBookId: string): Promise<FavoriteBooksWithBookAndBookImageUrl | null>;
    findManyByUserId(userId: string): Promise<FavoriteBooksWithBookAndBookImageUrl[]>;
    update(data: Prisma.FavoriteBookUpdateInput): Promise<FavoriteBook>;
    delete(favoriteBookId: string): Promise<void>;
    create(data: Prisma.FavoriteBookUncheckedCreateInput): Promise<FavoriteBook>;
}
