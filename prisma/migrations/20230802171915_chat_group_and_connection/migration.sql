/*
  Warnings:

  - You are about to drop the column `userId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_userId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_groupId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "groupId",
ADD COLUMN     "userGroupId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
