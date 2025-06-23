import type { FormData } from '@shared/model/FormTypes';
import { FormField } from '@shared/ui';
import { Lock, Mail } from 'lucide-react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import s from './UserAuthFields.module.scss';

interface UserAuthFieldsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isRegister?: boolean;
}

export const UserAuthFields = (props: UserAuthFieldsProps) => {
  const { register, errors, isRegister = false } = props;

  return (
    <div className={s.container}>
      <FormField
        type='email'
        title='Email'
        id='email'
        name='email'
        placeholder='example@email.com'
        register={register}
        error={errors.email}
      >
        <Mail className={s.icon} size={18} />
      </FormField>
      <FormField
        type='password'
        title='Пароль'
        id='password'
        name='password'
        placeholder='••••••••'
        register={register}
        error={errors.password}
      >
        <Lock className={s.icon} size={18} />
      </FormField>
      {isRegister && (
        <FormField
          type='password'
          title='Подтверждение пароля'
          id='confirmPassword'
          name='confirmPassword'
          placeholder='••••••••'
          register={register}
          error={errors.confirmPassword}
        >
          <Lock className={s.icon} size={18} />
        </FormField>
      )}
    </div>
  );
};
