'use client';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FeedbackForm, feedbackFormSchema } from './schema';

export default function Feedback() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackForm>({
    resolver: feedbackFormSchema,
  });

  const onSubmit: SubmitHandler<FeedbackForm> = data => console.log(data);

  const selectOptions = [
    { label: 'Bug', value: 1 },
    { label: 'Melhoria', value: 2 },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de feedback</h1>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Select
          className="w-full"
          errors={errors}
          label="Docente"
          name="teacherId"
          options={selectOptions}
          register={register}
          required
        />
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-100"
          href="/teacher"
          target="_blank">
          Não encontrou o docente? <br />
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
