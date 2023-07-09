import { courseFormSchema } from '@/app/course/schema';
import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { badRequest, created } from '@/utils/nextResponse';

export async function POST(req: Request) {
  try {
    const { name } = await courseFormSchema.validate(await req.json(), { stripUnknown: true });

    const exists = await prisma.course.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (exists) {
      return badRequest('Curso já cadastrado');
    }

    const course = await prisma.course.create({
      data: {
        name,
      },
    });

    return created(course, 'course');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
