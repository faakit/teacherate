import { courseFormSchema } from '@/app/course/schema';
import prisma from '@/lib/prisma';
import { badRequest, created } from '@/utils/nextResponse';

type reqBody = {
  name: string;
};

export async function POST(req: Request) {
  const { name } = await courseFormSchema.validate(await req.json());

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
