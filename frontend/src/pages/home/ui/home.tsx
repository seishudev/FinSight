import { observer } from 'mobx-react-lite';

import { AddTransactionModal } from '@/features/add-transaction';
import s from './home.module.scss';

export const Home = observer(() => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <section>
          <h2>Добро пожаловать!</h2>
          <p>Управляйте своими финансами легко и красиво</p>
        </section>

        <AddTransactionModal />
      </div>
    </div>
  );
});
