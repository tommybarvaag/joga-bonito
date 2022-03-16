/*
  Warnings:

  - Added the required column `weekNumber` to the `CageballEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CageballEvent" ADD COLUMN     "weekNumber" INTEGER NOT NULL;
