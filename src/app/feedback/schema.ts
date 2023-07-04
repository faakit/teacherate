import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchemaTexts } from '@/utils/yupSchemaTexts';

export type FeedbackForm = {
  teacherId: number;
  courseId: number;
  disciplineId: number;
  ratingSemester: string;
  description: string;
  value: number;
};

export const feedbackFormSchema = yupResolver(
  yup.object().shape({
    teacherId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
    courseId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
    disciplineId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
    ratingSemester: yup.string().typeError(yupSchemaTexts.string).required(yupSchemaTexts.required),
    description: yup.string().typeError(yupSchemaTexts.string).required(yupSchemaTexts.required),
    value: yup.number().typeError(yupSchemaTexts.number).required(yupSchemaTexts.required),
  }),
);
