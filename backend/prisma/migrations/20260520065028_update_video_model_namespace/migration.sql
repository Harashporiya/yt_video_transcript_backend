/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Video_videoId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Video_userId_videoId_key" ON "Video"("userId", "videoId");
