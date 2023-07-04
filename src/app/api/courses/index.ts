import prisma from '@/lib/prisma';
import { badRequest, created } from '@/utils/nextResponse';

type reqBody = {
  name: string;
};

export async function POST(req: Request) {
  const { name } = (await req.json()) as reqBody;

  const exists = await prisma.course.findFirst({
    where: {
      name,
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
}
