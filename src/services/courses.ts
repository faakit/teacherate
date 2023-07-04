import { ICourse } from '@/interfaces/ICourse';
import { IResponse } from '@/interfaces/IResponse';
import axios from 'axios';

export const getCourses = async (name: string): Promise<ICourse[]> => {
  const { data } = await axios.get<IResponse<ICourse[], 'courses'>>('http://localhost:3000/api/courses', {
    params: { name },
  });

  return data.courses;
};

export const createCourse = async (name: string): Promise<ICourse> => {
  const { data } = await axios.post<IResponse<ICourse, 'course'>>('http://localhost:3000/api/courses', {
    name,
  });

  return data.course;
};
