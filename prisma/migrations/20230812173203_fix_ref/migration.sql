/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `UserGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_userGroupId_fkey";

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "userGroupId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_groupId_key" ON "UserGroup"("groupId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
