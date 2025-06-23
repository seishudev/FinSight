import { RegisterByEmailForm } from '@features/register-by-email-form';
import { Link } from 'react-router';
import s from './Register.module.scss';

export const Register = () => {
  return (
    <div className={s.container}>
      <section className={s.wrapper}>
        <RegisterByEmailForm />
        <p className={s.login}>
          Уже есть аккаунт? <Link to='/login'>Войти</Link>
        </p>
      </section>
    </div>
  );
};
