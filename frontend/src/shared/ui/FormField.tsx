import type { FormFieldProps } from '../model/FormTypes';
import { cn } from '../utils/tw-merge';

export const FormField = (props: FormFieldProps) => {
  const {
    title,
    id,
    type,
    name,
    register,
    error,
    valueAsNumber,
    className,
    ...otherProps
  } = props;

  return (
    <div className={cn('form_field', className)}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        {...register(name, { valueAsNumber })}
        {...otherProps}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};
