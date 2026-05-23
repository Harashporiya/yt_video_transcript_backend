-- CreateTable
CREATE TABLE "InterviewQuestions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoRefId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "difficulty" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewQuestions_userId_idx" ON "InterviewQuestions"("userId");

-- CreateIndex
CREATE INDEX "InterviewQuestions_videoRefId_idx" ON "InterviewQuestions"("videoRefId");

-- AddForeignKey
ALTER TABLE "InterviewQuestions" ADD CONSTRAINT "InterviewQuestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestions" ADD CONSTRAINT "InterviewQuestions_videoRefId_fkey" FOREIGN KEY ("videoRefId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
