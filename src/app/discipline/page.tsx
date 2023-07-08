'use client';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { ICourse } from '@/interfaces/ICourse';
import { getCourses } from '@/services/courses';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DisciplineForm } from './schema';

export default function Discipline() {
  const [courses, setCourses] = React.useState<ICourse[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DisciplineForm>();

  const onSubmit: SubmitHandler<DisciplineForm> = data => console.log(data);

  const onFetchCourses = async (name: string) => {
    const fetchedCourses = await getCourses(name);
    setCourses(fetchedCourses);
    return fetchedCourses;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de disciplina</h1>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Curso"
          name="courseId"
          options={courses as any}
          control={control}
          valueAs="id"
          labelAs="name"
          isSearchable
          clearable
          required
          onFetch={onFetchCourses as any}
        />
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-100"
          href="/course"
          target="_blank">
          Não encontrou o curso? <br />
          Cadastre aqui
        </a>
        <Input
          className="w-full"
          errors={errors}
          label="Descrição"
          name="description"
          register={register}
          required
        />
      </form>
    </main>
  );
}
