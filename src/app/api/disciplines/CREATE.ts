import { disciplineFormSchema } from '@/app/discipline/schema';
import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { badRequest, created } from '@/utils/nextResponse';

export async function POST(req: Request) {
  try {
    const { name, courseId } = await disciplineFormSchema.validate(await req.json(), { stripUnknown: true });

    const exists = await prisma.discipline.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (exists) {
      return badRequest('Disciplina já cadastrada');
    }

    const discipline = await prisma.discipline.create({
      data: {
        name,
        courseId,
      },
    });

    return created(discipline, 'discipline');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
