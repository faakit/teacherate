'use client';
import { Input } from '@/components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FeedbackForm } from './schema';

export default function Feedback() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackForm>();

  const onSubmit: SubmitHandler<FeedbackForm> = data => console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de feedback</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
        <Input errors={errors} label={'Descrição'} name={'description'} register={register} required />
      </form>
    </main>
  );
}
