import { IDiscipline } from './IDiscipline';

export interface ITeacher {
  id: number;
  name: string;
  meanRating: number;
  ratingsCount: number;
  disciplines: IDiscipline[];
}
