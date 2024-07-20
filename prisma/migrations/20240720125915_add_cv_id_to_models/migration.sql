/*
  Warnings:

  - Added the required column `cvId` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `SoftSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `TechnicalSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `TestResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvId` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SoftSkill" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalSkill" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "cvId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalSkill" ADD CONSTRAINT "TechnicalSkill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftSkill" ADD CONSTRAINT "SoftSkill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
