import { Prisma, Progress } from "@prisma/client";

export interface ProgressRepository {
    findManyByRead(readId: string): Promise<Progress[]>;
    create(data: Prisma.ProgressUncheckedCreateInput): Promise<Progress>;
}
