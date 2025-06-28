import { UserAuthFields } from '@entities/user-auth-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import sound from '@shared/assets/sounds/startup-chime.mp3';
import { AuthForm } from '@shared/ui/custom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
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
      .then(() => {
        const audio = new Audio(sound);
        audio.play().catch(err => console.error(err));
        navigate('/welcome', { replace: true });
      })
      .catch(err =>
        toast.error(
          'Ошибка регистрации. Возможно, пользователь уже существует.',
          err
        )
      );
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
