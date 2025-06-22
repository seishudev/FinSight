import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
}

type ValidFieldNames = 'email' | 'password' | 'confirmPassword';
