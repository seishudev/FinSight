import { Link, useLocation } from 'react-router';
import { LogOut, ReceiptText } from 'lucide-react';

import { Logo } from '@/entities/logo';
import { PageTitle } from '@/entities/page-title';
import { sidebarRoutes } from '@/shared/constants/sidebar-routes';
import { AiAssistant } from '@/widgets/ai-assistant';
import s from './sidebar.module.scss';

export const Sidebar = () => {
  const pathname = useLocation().pathname;

  return (
    <aside className={s.container}>
      <div className={s.brand}>
        <PageTitle
          icon={<Logo />}
          title='FinSight'
          description='Финансовый трекер'
        />
      </div>

      <nav className={s.menu}>
        <ul className={s.list}>
          {sidebarRoutes.map((link, i) => (
            <Link
              key={i}
              className={`${s.link} ${pathname === link.route && s.activeLink}`}
              to={link.route}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className={s.features}>
        <AiAssistant />

        <Link to='/scanner'>
          <button className={s.scanner}>
            <ReceiptText />
            Сканер чеков
          </button>
        </Link>

        <button className={s.exit}>
          <LogOut />
          Выйти
        </button>
      </div>

      <div className={s.createdFor}>
        <p>
          FinSight v1.0
          <br />
          <span>Made for Hackathon</span>
        </p>
      </div>
    </aside>
  );
};
