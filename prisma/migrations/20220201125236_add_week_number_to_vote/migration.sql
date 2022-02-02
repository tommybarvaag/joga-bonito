/*
  Warnings:

  - A unique constraint covering the columns `[dateVoted,weekNumberVoted,userId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `weekNumberVoted` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vote_dateVoted_userId_key";

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "weekNumberVoted" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_dateVoted_weekNumberVoted_userId_key" ON "Vote"("dateVoted", "weekNumberVoted", "userId");
