'use client';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RatingForm, ratingFormSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { ICourse } from '@/interfaces/ICourse';
import { getCourses } from '@/services/courses';
import { getDisciplines } from '@/services/disciplines';
import { handleApiError } from '@/utils/handleApiError';
import { notify } from '@/utils/toast';
import { createRating } from '@/services/ratings';
import { ITeacher } from '@/interfaces/ITeacher';
import { IDiscipline } from '@/interfaces/IDiscipline';
import { listTeachers } from '@/services/teachers';

export default function Feedback() {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [disciplines, setDisciplines] = React.useState<IDiscipline[]>([]);
  const [teachers, setTeachers] = React.useState<ITeacher[]>([]);

  const { handleSubmit, control, watch } = useForm<RatingForm>({
    resolver: yupResolver(ratingFormSchema),
  });

  const isCourseSelected = !!watch('courseId');
  const isDisciplineSelected = !!watch('disciplineId');
  const isTeacherSelected = !!watch('teacherId');

  const onSubmit: SubmitHandler<RatingForm> = async params => {
    try {
      await createRating(params);
      notify.success('Feedback cadastrado com sucesso!');
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

  const onFetchDisciplines = React.useCallback(
    async (name: string) => {
      const fetchedDisciplines = await getDisciplines(name, watch('courseId'));
      setDisciplines(fetchedDisciplines);
      return fetchedDisciplines;
    },
    [watch],
  );

  const onFetchTeachers = React.useCallback(
    async (name: string) => {
      const fetchedTeachers = await listTeachers({ name, disciplineId: watch('disciplineId') });
      setTeachers(fetchedTeachers);
      return fetchedTeachers;
    },
    [watch],
  );

  React.useEffect(() => {
    isCourseSelected && onFetchDisciplines('');
  }, [isCourseSelected, onFetchDisciplines]);

  React.useEffect(() => {
    isDisciplineSelected && onFetchTeachers('');
  }, [isDisciplineSelected, onFetchTeachers]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de feedback</h1>
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
            <Select
              label="Professor"
              name="disciplineId"
              options={teachers as any}
              control={control}
              valueAs="id"
              labelAs="name"
              isSearchable
              clearable
              required
              onFetch={onFetchTeachers as any}
            />
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-100"
              href="/course"
              target="_blank">
              Não encontrou o professor? <br />
              Cadastre aqui
            </a>
          </>
        )}
        {isTeacherSelected && (
          <>
            {
              //todo add rating component
            }
          </>
        )}
      </form>
    </main>
  );
}
