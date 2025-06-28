import { Bot, LogOut, Menu, ReceiptText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { sidebarRoutes } from '@/shared/constants/sidebar-routes';
import { AiAssistant } from '@/widgets/ai-assistant';
import { PageTitle } from '@/entities/page-title';
import { Logo } from '@/entities/logo';
import { toast } from 'sonner';
import s from './mobile-sidebar.module.scss';

export const MobileSidebar = () => {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button className={s.trigger}>
          <Menu style={{ height: 24, width: 24 }} color='#fff' />
        </Button>
      </SheetTrigger>

      <SheetContent className={s.content} side='left'>
        <SheetTitle className={s.title}>
          <PageTitle
            icon={<Logo />}
            title='FinSight'
            description='Финансовый трекер'
          />
        </SheetTitle>

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

          <button>
            <ReceiptText />
            Сканер чеков
          </button>

          <button onClick={handleExit}>
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
      </SheetContent>
    </Sheet>
  );
};
