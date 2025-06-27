import { Outlet } from 'react-router';

import { Sidebar } from '@/widgets/sidebar';
import s from './main-layout.module.scss';
import { useMobile } from '@/shared/hooks/useMobile'
import { MobileSidebar } from '@/widgets/mobile-sidebar'

export const MainLayout = () => {
  const isMobile = useMobile(768);

  return (
    <div className={s.container}>
      {isMobile ? <MobileSidebar /> : <Sidebar />}

      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};
