import { teacherFormSchema } from '@/app/teacher/schema';
import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { badRequest, created } from '@/utils/nextResponse';

export async function POST(req: Request) {
  try {
    const { name, courseId, disciplineId, teacherId } = await teacherFormSchema.validate(await req.json(), {
      stripUnknown: true,
    });

    const disciplineExists = await prisma.discipline.findFirst({
      where: {
        id: {
          equals: disciplineId,
        },
        courseId: {
          equals: courseId,
        },
      },
    });

    if (!disciplineExists) {
      return badRequest('Esta disciplina não faz parte deste curso ou não existe.');
    }

    if (teacherId) {
      const teacherExists = await prisma.teacher.findFirst({
        where: {
          id: {
            equals: teacherId,
          },
        },
      });

      if (!teacherExists) {
        return badRequest('Este professor não existe.');
      }

      const teacherDisciplineExists = await prisma.teachersOnDisciplines.findFirst({
        where: {
          teacherId: {
            equals: teacherId,
          },
          disciplineId: {
            equals: disciplineId,
          },
        },
      });

      if (teacherDisciplineExists) {
        return badRequest('Este professor já está cadastrado nesta disciplina.');
      }

      await prisma.teachersOnDisciplines.create({
        data: {
          teacherId,
          disciplineId,
        },
      });

      return created(teacherExists, 'teacher');
    }

    const alreadyExists = await prisma.teacher.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        disciplines: {
          some: {
            disciplineId: {
              equals: disciplineId,
            },
          },
        },
      },
    });

    if (alreadyExists) {
      return badRequest('Este professor já está cadastrado nesta disciplina.');
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        meanRating: 0,
        ratingsCount: 0,
        disciplines: {
          create: {
            disciplineId,
          },
        },
      },
    });

    return created(teacher, 'teacher');
  } catch (error) {
    console.log(error);
    return apiErrorHandler(error);
  }
}
