import type { InputHTMLAttributes } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { FormFieldProps } from '../../interfaces/FormTypes';
import { cn } from '../../utils/tw-merge';

export const FormField = <T extends FieldValues>(
  props: FormFieldProps<T> & InputHTMLAttributes<HTMLInputElement>
) => {
  const {
    title,
    id,
    type,
    name,
    register,
    error,
    valueAsNumber,
    className,
    children,
    ...otherProps
  } = props;

  return (
    <div className={cn('form_field', className)}>
      <label htmlFor={id}>{title}</label>
      <div className='field'>
        {children}
        <input
          type={type}
          id={id}
          {...register(name, { valueAsNumber })}
          {...otherProps}
        />
      </div>
      {error && <span>{error.message}</span>}
    </div>
  );
};
