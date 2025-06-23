import { UserAuthFields } from '@entities/user-auth-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm } from '@shared/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { signUp } from '../api/registerApi';
import { schema, type RegisterByEmailFormData } from '../model/schema';

export const RegisterByEmailForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterByEmailFormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: RegisterByEmailFormData) => {
    signUp(data.email, data.password)
      .then(() => navigate('/', { replace: true }))
      .catch(err => console.error(`Registration error: ${err}`));
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      title='Создание аккаунта'
      description='Создайте аккаунт для начала работы'
      action='Зарегистрироваться'
    >
      <UserAuthFields
        register={register as any}
        errors={errors}
        isRegister={true}
      />
    </AuthForm>
  );
};
