import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

import { Sidebar } from '@/widgets/sidebar';
import s from './main-layout.module.scss';
import { useMobile } from '@/shared/hooks/useMobile';
import { MobileSidebar } from '@/widgets/mobile-sidebar';

export const MainLayout = () => {
  const isMobile = useMobile(768);

  return (
    <div className={s.container}>
      {isMobile ? <MobileSidebar /> : <Sidebar />}

      <div className={s.content}>
        <Outlet />

        <Toaster
          duration={2000}
          theme='dark'
          position='top-center'
          richColors
        />
      </div>
    </div>
  );
};
