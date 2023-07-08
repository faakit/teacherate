import { yupSchemaTexts } from '@/utils/yupSchemaTexts';
import * as yup from 'yup';

export type DisciplineForm = {
  name: string;
  courseId: number;
};

export const disciplineFormSchema = yup.object().shape({
  name: yup
    .string()
    .typeError(yupSchemaTexts.string)
    .required(yupSchemaTexts.required)
    .max(255, yupSchemaTexts.max(255))
    .trim(),
  courseId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
});
