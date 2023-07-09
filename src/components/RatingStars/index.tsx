import { Control, FieldValues, Path, useController } from 'react-hook-form';

import './styles.css';

export interface IRatingStarsProps<T extends Record<string, unknown>, Fields extends FieldValues> {
  name: Path<Fields>;
  label?: string | React.ReactNode;
  className?: string;
  required?: boolean;
  control: Control<Fields, unknown>;
  size?: '2' | '3' | '4' | '5' | '6' | '7' | '8';
}

export const RatingStars = <T extends Record<string, unknown>, Fields extends FieldValues>(
  props: IRatingStarsProps<T, Fields>,
) => {
  const { name, label, className, required, control, size } = props;

  const {
    fieldState: { error },
    field,
  } = useController({ name, control });

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name}>
        {required && <span className="mt-2 mr-1 text-red-500">*</span>}
        {label}
      </label>
      <div className={`rating flex gap-2  ${error && 'ring-2 ring-red-500'}`}>
        <input type="radio" id="star5" {...field} value={5} />
        <label className={`text-${size || ''}xl`} htmlFor="star5"></label>
        <input type="radio" id="star4" {...field} value={4} />
        <label className={`text-${size || ''}xl`} htmlFor="star4"></label>
        <input type="radio" id="star3" {...field} value={3} />
        <label className={`text-${size || ''}xl`} htmlFor="star3"></label>
        <input type="radio" id="star2" {...field} value={2} />
        <label className={`text-${size || ''}xl`} htmlFor="star2"></label>
        <input type="radio" id="star1" {...field} value={1} />
        <label className={`text-${size || ''}xl`} htmlFor="star1"></label>
      </div>
      {error?.message && <span className="text-red-500">{error?.message as string}</span>}
    </div>
  );
};
