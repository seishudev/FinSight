import { Logo } from '@/entities/logo';
import s from './brand.module.scss';

export const Brand = () => {
  return (
    <div className={s.container}>
      <Logo />

      <section className={s.brand}>
        <h1>FinSight</h1>
        <p>Финансовый трекер</p>
      </section>
    </div>
  );
};
