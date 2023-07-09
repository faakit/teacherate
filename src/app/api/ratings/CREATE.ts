import { ratingFormSchema } from '@/app/rating/schema';
import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { badRequest, created } from '@/utils/nextResponse';

export async function POST(req: Request) {
  try {
    const { courseId, disciplineId, teacherId, description, ratingSemester, value } =
      await ratingFormSchema.validate(await req.json(), {
        stripUnknown: true,
      });

    const rating = await prisma.$transaction(async client => {
      const teacher = await client.teacher.findFirst({
        where: {
          id: teacherId,
          disciplines: {
            some: {
              disciplineId,
            },
          },
        },
      });

      if (!teacher) {
        return badRequest('Este professor não leciona esta disciplina.');
      }

      const rate = client.rating.create({
        data: {
          courseId,
          disciplineId,
          teacherId,
          description,
          ratingSemester,
          value,
        },
      });

      client.teacher.update({
        where: {
          id: teacherId,
        },
        data: {
          ratingsSum: {
            increment: value,
          },
          ratingsCount: {
            increment: 1,
          },
        },
      });

      return rate;
    });

    return created(rating, 'rating');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
