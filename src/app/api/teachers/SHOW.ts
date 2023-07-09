import prisma from '@/lib/prisma';
import { apiErrorHandler } from '@/utils/apiErrorHandler';
import { ok } from '@/utils/nextResponse';

export async function GET(req: Request, { id }: { id: string }) {
  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    });

    return ok(teacher, 'teacher');
  } catch (error) {
    return apiErrorHandler(error);
  }
}
