import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { ok } from '@/utils/nextResponse';
import * as Yup from 'yup';

const queryParams = Yup.object().shape({
  name: Yup.string().optional(),
  courseId: Yup.number().required(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());

    const { name, courseId } = await queryParams.validate(params);

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
