/*
  Warnings:

  - A unique constraint covering the columns `[namespace]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Made the column `namespace` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "namespace" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Video_namespace_key" ON "Video"("namespace");
