/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_disciplineId_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "disciplineId";

-- CreateTable
CREATE TABLE "TeachersOnDisciplines" (
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeachersOnDisciplines_pkey" PRIMARY KEY ("teacherId","disciplineId")
);

-- AddForeignKey
ALTER TABLE "TeachersOnDisciplines" ADD CONSTRAINT "TeachersOnDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachersOnDisciplines" ADD CONSTRAINT "TeachersOnDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
