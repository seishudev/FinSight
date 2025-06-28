import { Bot, LogOut, ReceiptText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

import { Logo } from '@/entities/logo';
import { PageTitle } from '@/entities/page-title';
import { logOut } from '@/shared/api/axiosInstance';
import { sidebarRoutes } from '@/shared/constants/sidebar-routes';
import { AiAssistant } from '@/widgets/ai-assistant';
import { toast } from 'sonner';
import s from './sidebar.module.scss';

export const Sidebar = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleExit = () => {
    logOut()
      .then(() => {
        navigate('/login', { replace: true });
        toast.success('Вы вышли из аккаунта');
      })
      .catch(e => {
        toast.error('Произошла ошибка');
        console.error(e);
      });
  };

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

        <button className={s.exit} onClick={handleExit}>
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
