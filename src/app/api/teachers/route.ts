import { teacherFormSchema } from '@/app/teacher/schema';
import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { badRequest, created, ok } from '@/utils/nextResponse';

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

      const teacherDiscipline = await prisma.teachersOnDisciplines.create({
        data: {
          teacherId,
          disciplineId,
        },
      });

      return created(teacherExists, 'teacher');
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';
    const courseId = Number(searchParams.get('courseId') || 0);

    const disciplines = await prisma.discipline.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        courseId: {
          equals: courseId,
        },
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });

    return ok(disciplines, 'disciplines');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
