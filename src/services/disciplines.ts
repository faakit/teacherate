import { IDiscipline } from '@/interfaces/IDiscipline';
import { IResponse } from '@/interfaces/IResponse';
import axios from 'axios';

export const createDiscipline = async (name: string, courseId: number): Promise<IDiscipline> => {
  const { data } = await axios.post<IResponse<IDiscipline, 'discipline'>>(
    'http://localhost:3000/api/disciplines',
    {
      name,
      courseId,
    },
  );

  return data.discipline;
};
