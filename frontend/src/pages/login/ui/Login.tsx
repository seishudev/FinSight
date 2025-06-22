import { AuthByEmailForm } from '@features/auth-by-email-form';
import { Link } from 'react-router';

export const Login = () => {
  return (
    <section className='h-dvh'>
      <AuthByEmailForm />
      <p>
        Нет аккаунта?
        <Link to='/register'>Зарегистрироваться</Link>
      </p>
    </section>
  );
};
