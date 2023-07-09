import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { ok } from '@/utils/nextResponse';
import * as Yup from 'yup';

const queryParams = Yup.object().shape({
  name: Yup.string().required(),
  courseId: Yup.number().optional(),
  disciplineId: Yup.number().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());

    const { name, disciplineId } = await queryParams.validate(params);

    const teachers = await prisma.teacher.findMany({
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
      include: {
        disciplines: true,
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });

    return ok(teachers, 'teachers');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
