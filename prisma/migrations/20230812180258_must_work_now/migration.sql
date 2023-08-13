/*
  Warnings:

  - You are about to drop the column `userGroupId` on the `Messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_userGroupId_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "userGroupId",
ADD COLUMN     "groupId" TEXT;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
