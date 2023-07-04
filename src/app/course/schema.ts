import { yupSchemaTexts } from '@/utils/yupSchemaTexts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type CourseForm = {
  name: string;
};

export const courseFormSchema = yupResolver(
  yup.object().shape({
    name: yup.string().typeError(yupSchemaTexts.string).required(yupSchemaTexts.required),
  }),
);
