/*
  Warnings:

  - You are about to drop the `TwoFactorCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TwoFactorCode" DROP CONSTRAINT "TwoFactorCode_userId_fkey";

-- DropTable
DROP TABLE "TwoFactorCode";
