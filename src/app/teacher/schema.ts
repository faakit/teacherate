import { yupSchemaTexts } from '@/utils/yupSchemaTexts';
import * as yup from 'yup';

export type TeacherForm = {
  name: string;
  disciplineId: number;
  courseId: number;
  teacherId: number | undefined;
};

export const teacherFormSchema = yup.object().shape({
  name: yup
    .string()
    .typeError(yupSchemaTexts.string)
    .required(yupSchemaTexts.required)
    .max(255, yupSchemaTexts.max(255))
    .trim(),
  disciplineId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
  courseId: yup.number().typeError(yupSchemaTexts.required).required(yupSchemaTexts.required),
  teacherId: yup.number().typeError(yupSchemaTexts.required).optional(),
});
