import { cn } from '@shared/utils/tw-merge';
import { Sparkles } from 'lucide-react';

import s from './logo.module.scss';

interface LogoProps {
  containerPadding?: number;
  logoSize?: number;
  logoColor?: string;
  className?: string;
}

export const Logo = ({
  containerPadding = 8,
  logoSize = 24,
  logoColor = '#fff',
  className
}: LogoProps) => {
  return (
    <div
      style={{ padding: containerPadding }}
      className={cn(s.container, className)}
    >
      <Sparkles color={logoColor} size={logoSize} />
    </div>
  );
};
