'use client';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Discipline() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = data => console.log(data);

  const selectOptions = [
    { label: 'Bug', value: 1 },
    { label: 'Melhoria', value: 2 },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Cadastro de disciplina</h1>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Select label="Disciplina" name="teacherId" options={selectOptions} control={control} required />
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
