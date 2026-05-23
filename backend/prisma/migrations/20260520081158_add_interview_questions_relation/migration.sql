/*
  Warnings:

  - You are about to drop the `InterviewQuestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InterviewQuestions" DROP CONSTRAINT "InterviewQuestions_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewQuestions" DROP CONSTRAINT "InterviewQuestions_videoRefId_fkey";

-- DropTable
DROP TABLE "InterviewQuestions";
