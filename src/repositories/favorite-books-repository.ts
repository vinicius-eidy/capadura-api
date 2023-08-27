import { FavoriteBook, Prisma } from "@prisma/client";

export interface FavoriteBooksWithBookAndBookImageUrl extends FavoriteBook {
    book: {
        id: string;
        title: string;
        authors: string[];
        image_key: string | null;
        page_count: number | null;
        publish_date: Date | null;
        imageUrl?: string;
    };
}

export interface FavoriteBooksRepository {
    findUnique(favoriteBookId: string): Promise<FavoriteBooksWithBookAndBookImageUrl | null>;
    findManyByUserId(userId: string): Promise<FavoriteBooksWithBookAndBookImageUrl[]>;
    update(data: Prisma.FavoriteBookUpdateInput): Promise<FavoriteBook>;
    delete(favoriteBookId: string): Promise<void>;
    create(data: Prisma.FavoriteBookUncheckedCreateInput): Promise<FavoriteBook>;
}
