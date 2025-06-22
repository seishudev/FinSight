import { UserAuthFields } from '@entities/user-auth-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm } from '@shared/ui';
import { useForm } from 'react-hook-form';
import { schema, type AuthByEmailFormData } from '../model/schema';

export const AuthByEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthByEmailFormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: AuthByEmailFormData) => {
    console.log(data);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      title='Вход в аккаунт'
      description='Войдите, чтобы продолжить управление финансами'
      action='Войти'
    >
      <UserAuthFields register={register} errors={errors} />
    </AuthForm>
  );
};
