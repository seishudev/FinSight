import type { FormData } from '@shared/model/FormTypes';
import { FormField } from '@shared/ui';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

interface UserAuthFieldsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isRegister?: boolean;
}

export const UserAuthFields = (props: UserAuthFieldsProps) => {
  const { register, errors, isRegister = false } = props;

  return (
    <>
      <FormField
        type='email'
        title='Email'
        id='email'
        name='email'
        placeholder='example@email.com'
        register={register}
        error={errors.email}
      />
      <FormField
        type='password'
        title='Пароль'
        id='password'
        name='password'
        placeholder='••••••••'
        register={register}
        error={errors.password}
      />
      {isRegister && (
        <FormField
          type='password'
          title='Подтверждение пароля'
          id='confirmPassword'
          name='confirmPassword'
          placeholder='••••••••'
          register={register}
          error={errors.confirmPassword}
        />
      )}
    </>
  );
};
