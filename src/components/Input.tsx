type InputProps = {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  errors: any;
  type?: 'text' | 'number' | 'textarea';
  [key: string]: any;
};

export const Input = ({ label, name, register, required, errors, type = 'text', ...rest }: InputProps) => {
  const InputType = type === 'textarea' ? 'textarea' : 'input';

  if (type === 'number') {
    rest.type = 'number';
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <InputType
        id={name}
        className="border border-gray-400 rounded-md p-2"
        {...register(name, { required })}
        {...rest}
      />
      {errors[name] && <span className="text-red-500">Campo obrigatório</span>}
    </div>
  );
};
