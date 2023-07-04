/*
  Warnings:

  - Added the required column `meanRating` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingsCount` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "meanRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ratingsCount" INTEGER NOT NULL;
