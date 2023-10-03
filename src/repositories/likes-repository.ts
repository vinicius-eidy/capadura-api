import { Like, Prisma } from "@prisma/client";

export interface FindManyByUserIdOutput {
    id: string;
    created_at: Date;
    user_id: string;
    book_id: string;
    book: {
        id: string;
        title: string;
        authors: string[];
        publish_date: Date | null;
        page_count: number | null;
        image_key: string | null;
        imageUrl?: string;
    };
}

export interface LikesRepository {
    findUniqueById(likeId: string): Promise<Like | null>;
    findManyByUserId(userId: string): Promise<FindManyByUserIdOutput[]>;
    findManyByBookId(bookId: string): Promise<Like[] | null>;
    getTotalCountByUser(userId: string): Promise<number>;
    getTotalCountByBook(bookId: string): Promise<number>;
    findUniqueByBookIdAndUserId(bookId: string, userId: string): Promise<Like | null>;
    delete(likeId: string, userId: string): Promise<void>;
    create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>;
}
