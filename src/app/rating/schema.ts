import * as yup from 'yup';
import { yupSchemaTexts } from '@/utils/yupSchemaTexts';

export type RatingForm = {
  teacherId: number;
  courseId: number;
  disciplineId: number;
  ratingSemester: string;
  description: string;
  value: number;
};

export const ratingFormSchema = yup.object().shape({
  teacherId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
  courseId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
  disciplineId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
  ratingSemester: yup
    .string()
    .typeError(yupSchemaTexts.string)
    .test('ratingSemester', value => {
      const regex = new RegExp('^d{4}/[12]$');
      return regex.test(value as string);
    })
    .required(yupSchemaTexts.required),
  description: yup.string().typeError(yupSchemaTexts.string).required(yupSchemaTexts.required),
  value: yup
    .number()
    .typeError(yupSchemaTexts.number)
    .required(yupSchemaTexts.required)
    .min(1, yupSchemaTexts.min(1))
    .max(5, yupSchemaTexts.max(5)),
});
