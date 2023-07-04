type InputProps = {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  errors: any;
  type?: 'text' | 'number' | 'textarea';
  className?: string;
  [key: string]: any;
};

export const Input = ({
  label,
  name,
  register,
  required,
  errors,
  type = 'text',
  className,
  ...rest
}: InputProps) => {
  const InputType = type === 'textarea' ? 'textarea' : 'input';

  if (type === 'number') {
    rest.type = 'number';
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name}>{label}</label>
      <InputType
        id={name}
        className="border border-gray-300 rounded-md p-2 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-blue-500"
        {...register(name, { required })}
        {...rest}
      />
      {errors[name]?.message && <span className="text-red-500">{errors[name]?.message as string}</span>}
    </div>
  );
};
