/*
  Warnings:

  - Added the required column `expiresIn` to the `UserAccountToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAccountToken" ADD COLUMN     "expiresIn" BIGINT NOT NULL;
