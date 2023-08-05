/*
  Warnings:

  - You are about to drop the column `hashedRefreshToekn` on the `UserAccountToken` table. All the data in the column will be lost.
  - Added the required column `hashedRefreshToken` to the `UserAccountToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAccountToken" DROP COLUMN "hashedRefreshToekn",
ADD COLUMN     "hashedRefreshToken" TEXT NOT NULL;
