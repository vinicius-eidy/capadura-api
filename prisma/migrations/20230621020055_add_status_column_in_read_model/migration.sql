/*
  Warnings:

  - Added the required column `status` to the `Read` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReadStatus" AS ENUM ('ACTIVE', 'FINISHED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Read" ADD COLUMN     "status" "ReadStatus" NOT NULL;
