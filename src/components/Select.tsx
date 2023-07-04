import { FieldErrors, UseFormRegister } from 'react-hook-form';

type SelectProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  errors: FieldErrors;
  options: { label: string; value: string | number }[];
  className?: string;
  [key: string]: any;
};

export const Select = ({
  label,
  name,
  register,
  required,
  errors,
  options,
  className,
  ...rest
}: SelectProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        className="border border-gray-400 rounded-md p-2"
        {...register(name, { required })}
        {...rest}>
        <option>Selecione um docente</option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name]?.message && <span className="text-red-500">{errors[name]?.message as string}</span>}
    </div>
  );
};
