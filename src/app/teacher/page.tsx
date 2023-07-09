'use client';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { ICourse } from '@/interfaces/ICourse';
import { getCourses } from '@/services/courses';
import { getDisciplines } from '@/services/disciplines';
import { handleApiError } from '@/utils/handleApiError';
import { notify } from '@/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TeacherForm, teacherFormSchema } from './schema';
import { createTeacher } from '@/services/teachers';

export default function Teacher() {
  const router = useRouter();
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [disciplines, setDisciplines] = React.useState<ICourse[]>([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TeacherForm>({
    resolver: yupResolver(teacherFormSchema),
  });

  const isCourseSelected = !!watch('courseId');
  const isDisciplineSelected = !!watch('disciplineId');

  const onSubmit: SubmitHandler<TeacherForm> = async params => {
    try {
      await createTeacher(params);
      notify.success('Professor cadastrado com sucesso!');
    } catch (error) {
      handleApiError(error);
    }
    // router.push('/');
  };

  const onFetchCourses = async (name: string) => {
    const fetchedCourses = await getCourses(name);
    setCourses(fetchedCourses);
    return fetchedCourses;
  };

  const onFetchDisciplines = async (name: string) => {
    const fetchedDisciplines = await getDisciplines(name, watch('courseId'));
    setDisciplines(fetchedDisciplines);
    return fetchedDisciplines;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de professor</h1>
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
        {isCourseSelected && (
          <>
            <Select
              label="Disciplina"
              name="disciplineId"
              options={disciplines as any}
              control={control}
              valueAs="id"
              labelAs="name"
              isSearchable
              clearable
              required
              onFetch={onFetchDisciplines as any}
            />
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-100"
              href="/course"
              target="_blank">
              Não encontrou a disciplina? <br />
              Cadastre aqui
            </a>
          </>
        )}
        {isDisciplineSelected && (
          <>
            <Input
              className="w-full"
              errors={errors}
              label="Nome do professor"
              name="name"
              control={control}
              required
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-100 w-full"
              type="submit">
              Cadastrar
            </button>
          </>
        )}
      </form>
    </main>
  );
}
