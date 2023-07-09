'use client';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FeedbackForm, feedbackFormSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Feedback() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FeedbackForm>({
    resolver: yupResolver(feedbackFormSchema),
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
          label="Docente"
          name="teacherId"
          options={selectOptions}
          control={control}
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
          control={control}
          required
        />
      </form>
    </main>
  );
}
