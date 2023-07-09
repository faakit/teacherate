import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface InputProps<T extends Record<string, unknown>, Fields extends FieldValues> {
  label: string;
  control: Control<Fields, unknown>;
  name: Path<Fields>;
  required?: boolean;
  type?: 'text' | 'number' | 'textarea';
  className?: string;
  shouldUnregister?: boolean;
  [key: string]: any;
}

export const Input = <T extends Record<string, unknown>, Fields extends FieldValues>({
  label,
  name,
  control,
  required,
  type = 'text',
  className,
  shouldUnregister,
  ...rest
}: InputProps<T, Fields>) => {
  const InputType = type === 'textarea' ? 'textarea' : 'input';

  if (type === 'number') {
    rest.type = 'number';
  }

  const {
    fieldState: { error },
    field,
  } = useController({ name, control, shouldUnregister });

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name}>
        {required && <span className="mt-2 mr-1 text-red-500">*</span>}
        {label}
      </label>
      <InputType
        id={name}
        className="border border-gray-300 rounded-md p-2 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-blue-500"
        {...field}
        {...rest}
      />
      {error?.message && <span className="text-red-500">{error?.message as string}</span>}
    </div>
  );
};
