import { AuthByEmailForm } from '@features/auth-by-email-form';
import { Link } from 'react-router';
import s from './Login.module.scss';

export const Login = () => {
  return (
    <div className={s.container}>
      <section className='bg-gray-900/95 backdrop-blur-md rounded-3xl border border-white/20 w-full max-w-md shadow-2xl animate-fade-in pb-6'>
        <AuthByEmailForm />
        <p className={s.password}>
          Нет аккаунта?
          <Link to='/register'>Зарегистрироваться</Link>
        </p>
      </section>
    </div>
  );
};
