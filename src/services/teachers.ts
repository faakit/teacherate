import { IResponse } from '@/interfaces/IResponse';
import { ITeacher } from '@/interfaces/ITeacher';
import axios from 'axios';

type CreateTeacherParams = {
  name: string;
  disciplineId: number;
  courseId: number;
  teacherId: number | undefined;
};

type ListTeachersParams = {
  name: string;
  disciplineId: number;
};

export const createTeacher = async ({
  name,
  disciplineId,
  courseId,
  teacherId,
}: CreateTeacherParams): Promise<ITeacher> => {
  const { data } = await axios.post<IResponse<ITeacher, 'teacher'>>('http://localhost:3000/api/teachers', {
    name,
    disciplineId,
    courseId,
    teacherId,
  });

  return data.teacher;
};

export const listTeachers = async (params: ListTeachersParams): Promise<ITeacher[]> => {
  const { data } = await axios.get<IResponse<ITeacher[], 'teachers'>>('http://localhost:3000/api/teachers', {
    params,
  });

  return data.teachers;
};
