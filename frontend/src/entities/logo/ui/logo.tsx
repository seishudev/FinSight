import { Sparkles } from 'lucide-react';

import s from './logo.module.scss';

interface LogoProps {
  containerPadding?: number;
  logoSize?: number;
  logoColor?: string;
}

export const Logo = ({
  containerPadding = 8,
  logoSize = 24,
  logoColor = '#fff'
}: LogoProps) => {
  return (
    <div style={{ padding: containerPadding }} className={s.container}>
      <Sparkles color={logoColor} size={logoSize} />
    </div>
  );
};
