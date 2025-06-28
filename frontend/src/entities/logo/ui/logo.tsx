import { cloneElement, type JSX } from 'react';
import { Sparkles } from 'lucide-react';

import { cn } from '@shared/utils/tw-merge';
import s from './logo.module.scss';

interface LogoProps {
  containerPadding?: number;
  logoSize?: number;
  logoColor?: string;
  icon?: JSX.Element;
  className?: string;
}

export const Logo = ({
  containerPadding = 8,
  logoSize = 24,
  logoColor = '#fff',
  className,
  icon = <Sparkles />
}: LogoProps) => {
  return (
    <div
      style={{ padding: containerPadding }}
      className={cn(s.container, className)}
    >
      {cloneElement(icon, { color: logoColor, size: logoSize })}
    </div>
  );
};
