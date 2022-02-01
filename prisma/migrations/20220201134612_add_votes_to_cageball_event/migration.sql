/*
  Warnings:

  - Added the required column `cageballEventId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "cageballEventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_cageballEventId_fkey" FOREIGN KEY ("cageballEventId") REFERENCES "CageballEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
