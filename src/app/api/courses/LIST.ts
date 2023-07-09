import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { ok } from '@/utils/nextResponse';
import * as Yup from 'yup';

const queryParams = Yup.object().shape({
  name: Yup.string().required(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());

    const { name } = await queryParams.validate(params);

    const courses = await prisma.course.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });

    return ok(courses, 'courses');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
