/*
  Warnings:

  - You are about to drop the column `cvId` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `SoftSkill` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `TechnicalSkill` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `cvId` on the `WorkExperience` table. All the data in the column will be lost.
  - Made the column `content` on table `Cv` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_cvId_fkey";

-- DropForeignKey
ALTER TABLE "SoftSkill" DROP CONSTRAINT "SoftSkill_cvId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalSkill" DROP CONSTRAINT "TechnicalSkill_cvId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_cvId_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_cvId_fkey";

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "Cv" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "SoftSkill" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "TechnicalSkill" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "cvId";

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "cvId";
