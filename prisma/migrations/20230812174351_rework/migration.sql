/*
  Warnings:

  - The `userGroupId` column on the `Messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_userGroupId_fkey";

-- DropIndex
DROP INDEX "UserGroup_groupId_key";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "userGroupId",
ADD COLUMN     "userGroupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
