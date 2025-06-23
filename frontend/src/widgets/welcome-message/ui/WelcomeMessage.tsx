import { Logo } from '@entities/logo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import s from './WelcomeMessage.module.scss';

export const WelcomeMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className={s.container}>
      <div className={s.logo}>
        <div>
          <Logo logoSize={40} />
        </div>
      </div>
      <h1 className={s.title}>Добро пожаловать!</h1>
      <p className={s.description}>
        FinSight - ваш персональный финансовый помощник
      </p>
      <div className={s.wrapper}>
        <div>
          <span className='w-3 h-3 bg-indigo-500 rounded-full animate-pulse'></span>
          <span className='w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-100'></span>
          <span className='w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-200'></span>
        </div>
      </div>
    </section>
  );
};
