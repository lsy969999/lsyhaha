-- CreateEnum
CREATE TYPE "DelStatus" AS ENUM ('Y', 'N');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'InActive');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Guest', 'Email', 'Google', 'Kakao', 'Naver');

-- CreateTable
CREATE TABLE "User" (
    "userSn" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "ci" TEXT,
    "userStatus" "UserStatus" NOT NULL DEFAULT 'Active',
    "delStatus" "DelStatus" NOT NULL DEFAULT 'N',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createBy" INTEGER NOT NULL,
    "updateBy" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userSn")
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "userAccountSn" SERIAL NOT NULL,
    "userSn" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "provider" "Provider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "delStatus" "DelStatus" NOT NULL DEFAULT 'N',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createBy" INTEGER NOT NULL,
    "updateBy" INTEGER NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("userAccountSn")
);

-- CreateTable
CREATE TABLE "UserAccountToken" (
    "userAccountTokenSn" SERIAL NOT NULL,
    "userAccountSn" INTEGER NOT NULL,
    "hashedRefreshToekn" TEXT NOT NULL,
    "delStatus" "DelStatus" NOT NULL DEFAULT 'N',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createBy" INTEGER NOT NULL,
    "updateBy" INTEGER NOT NULL,

    CONSTRAINT "UserAccountToken_pkey" PRIMARY KEY ("userAccountTokenSn")
);

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_userSn_fkey" FOREIGN KEY ("userSn") REFERENCES "User"("userSn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccountToken" ADD CONSTRAINT "UserAccountToken_userAccountSn_fkey" FOREIGN KEY ("userAccountSn") REFERENCES "UserAccount"("userAccountSn") ON DELETE RESTRICT ON UPDATE CASCADE;
