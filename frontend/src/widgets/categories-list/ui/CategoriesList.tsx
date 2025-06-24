import s from './CategoriesList.module.scss';

export const CategoriesList = ({ title, icon }: Record<string, string>) => {
  return (
    <section className={s.container}>
      <h3 className={s.title}>
        <span className='text-xl lg:text-2xl'>{icon}</span>
        {title}
      </h3>
      <div className={s.wrapper}></div>
    </section>
  );
};
