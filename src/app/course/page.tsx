'use client';
import { Input } from '@/components/Input';
import { handleApiError } from '@/utils/handleApiError';
import { notify } from '@/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CourseForm, courseFormSchema } from './schema';

export default function Course() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseForm>({ resolver: yupResolver(courseFormSchema) });

  const onSubmit: SubmitHandler<CourseForm> = async data => {
    try {
      await axios.post('/api/courses', data);
      notify.success('Curso cadastrado com sucesso!');
    } catch (error) {
      handleApiError(error);
    }
    router.push('/discipline');
  };

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
