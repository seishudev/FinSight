import type { FieldValues } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';

import type { FormFieldProps } from '../model/FormTypes';
import { cn } from '../utils/tw-merge';
import { Label } from './label';
import { Input } from './input';

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
    ...otherProps
  } = props;

  return (
    <div className={cn('form_field', className)}>
      <Label htmlFor={id}>{title}</Label>
      <Input
        type={type}
        id={id}
        {...register(name, { valueAsNumber })}
        {...otherProps}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};
