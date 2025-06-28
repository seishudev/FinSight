import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

import { AddTransactionModal } from '@/features/add-transaction';
import { useMobile } from '@/shared/hooks/useMobile';
import { MobileSidebar } from '@/widgets/mobile-sidebar';
import { Sidebar } from '@/widgets/sidebar';
import s from './main-layout.module.scss';

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

        <AddTransactionModal />
      </div>
    </div>
  );
};
