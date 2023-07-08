import { yupSchemaTexts } from '@/utils/yupSchemaTexts';
import * as yup from 'yup';

export type CourseForm = {
  name: string;
};

export const courseFormSchema = yup.object().shape({
  name: yup
    .string()
    .typeError(yupSchemaTexts.string)
    .required(yupSchemaTexts.required)
    .max(255, yupSchemaTexts.max(255))
    .trim(),
});
