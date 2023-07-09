export interface IRating {
  id: number;
  value: number;
  description: string;
  ratingSemester: string;

  courseId: number;

  teacherId: number;

  disciplineId: number;

  createdAt: Date;
}
