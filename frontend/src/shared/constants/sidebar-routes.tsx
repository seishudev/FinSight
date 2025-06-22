import { ChartPie, House, Tag, Target } from 'lucide-react';

export const sidebarRoutes = [
  {
    route: '/',
    name: 'Главная',
    icon: <House size={20} />
  },
  {
    route: '/analytics',
    name: 'Аналитика',
    icon: <ChartPie size={20} />
  },
  {
    route: '/categories',
    name: 'Категории',
    icon: <Tag size={20} />
  },
  {
    route: '/budget',
    name: 'Бюджеты',
    icon: <Target size={20} />
  }
];
