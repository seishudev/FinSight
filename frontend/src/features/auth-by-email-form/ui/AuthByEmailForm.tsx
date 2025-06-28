import { UserAuthFields } from '@entities/user-auth-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import sound from '@shared/assets/sounds/startup-chime.mp3';
import { AuthForm } from '@shared/ui/custom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signIn } from '../api/loginApi';
import { schema, type AuthByEmailFormData } from '../model/schema';

export const AuthByEmailForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthByEmailFormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: AuthByEmailFormData) => {
    signIn(data.email, data.password)
      .then(() => {
        const audio = new Audio(sound);
        audio.play().catch(err => console.error(err));
        toast.success('Добро пожаловать!');
        navigate('/welcome', { replace: true });
      })
      .catch(err => {
        toast.error('Ошибка входа. Проверьте почту или пароль.');
        console.error(`Authorization error: ${err}`);
      });
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
