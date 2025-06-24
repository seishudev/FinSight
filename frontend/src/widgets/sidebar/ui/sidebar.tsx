import { Link, useLocation } from 'react-router';
import { Bot, LogOut, ReceiptText } from 'lucide-react';

import { sidebarRoutes } from '@/shared/constants/sidebar-routes';
import { PageTitle } from '@/entities/page-title';
import { Logo } from '@/entities/logo';
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
        <button>
          <Bot />
          AI Помощник
        </button>

        <button>
          <ReceiptText />
          Сканер чеков
        </button>

        <button>
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
