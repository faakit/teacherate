'use client';
import { Input } from '@/components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CourseForm, courseFormSchema } from './schema';

export default function Course() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CourseForm>({ resolver: courseFormSchema });

  const onSubmit: SubmitHandler<CourseForm> = data => console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de curso</h1>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="w-full"
          errors={errors}
          label="Nome do curso"
          name="name"
          register={register}
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-100 w-full"
          type="submit">
          Cadastrar
        </button>
      </form>
    </main>
  );
}
