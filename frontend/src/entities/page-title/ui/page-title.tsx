import type { ReactNode } from 'react';

import s from './page-title.module.scss';

interface PageTitleProps {
  title: string;
  description: string;
  icon: ReactNode
}

export const PageTitle = ({ icon, title, description }: PageTitleProps) => {
  return (
    <div className={s.container}>
      {icon}

      <section className={s.brand}>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    </div>
  );
};
