import { IRating } from '@/interfaces/IRating';
import { IResponse } from '@/interfaces/IResponse';
import axios from 'axios';

type CreateRatingParams = {
  teacherId: number;
  courseId: number;
  disciplineId: number;
  ratingSemester: string;
  description: string;
  value: number;
};

export const createRating = async (params: CreateRatingParams): Promise<IRating> => {
  const { data } = await axios.post<IResponse<IRating, 'rating'>>(
    'http://localhost:3000/api/Ratings',
    params,
  );

  return data.rating;
};
