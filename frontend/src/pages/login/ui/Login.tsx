import { AuthByEmailForm } from '@features/auth-by-email-form';
import { Link } from 'react-router';
import s from './Login.module.scss';

export const Login = () => {
  return (
    <div className={s.container}>
      <section className={s.wrapper}>
        <AuthByEmailForm />
        <p className={s.register}>
          Нет аккаунта?
          <Link to='/register'>Зарегистрироваться</Link>
        </p>
      </section>
    </div>
  );
};
