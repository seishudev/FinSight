import { Outlet } from 'react-router';

import { Sidebar } from '@/widgets/sidebar';
import s from './main-layout.module.scss';

export const MainLayout = () => {
  return (
    <div className={s.container}>
      <Sidebar />

      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};
