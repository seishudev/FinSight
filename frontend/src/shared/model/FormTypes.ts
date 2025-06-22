import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form';

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FormFieldProps<T extends FieldValues> {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
}
