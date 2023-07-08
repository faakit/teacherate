import { disciplineFormSchema } from '@/app/discipline/schema';
import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { badRequest, created, ok } from '@/utils/nextResponse';

export async function POST(req: Request) {
  try {
    const { name, courseId } = await disciplineFormSchema.validate(await req.json());

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';

    const disciplines = await prisma.discipline.findMany({
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

    return ok(disciplines, 'disciplines');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
