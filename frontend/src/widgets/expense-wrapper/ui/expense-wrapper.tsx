import type { PropsWithChildren, ReactNode } from 'react';

import s from './expense-wrapper.module.scss';
import { cn } from '@/shared/utils/tw-merge';
import { Link } from 'react-router';

interface ExpenseWrapperProps {
  className: string;
  icon: ReactNode | string;
  linkIcon?: ReactNode;
  title: string;
  link?: string;
  href?: string;
}

export const ExpenseWrapper = ({
  children,
  className,
  linkIcon,
  icon,
  link,
  href,
  title
}: PropsWithChildren<Partial<ExpenseWrapperProps>>) => {
  return (
    <div className={cn(s.container, className)}>
      {title && (
        <div className={s.header}>
          <h3 className={s.title}>
            {icon && icon}
            {title}
          </h3>

          {link && href && (
            <Link className={s.link} to={href}>
              {link}
              {linkIcon}
            </Link>
          )}
        </div>
      )}

      {children}

      {link && href && (
        <Link className={`${s.link} ${s.mobileLink}`} to={href}>
          {link}
          {linkIcon}
        </Link>
      )}
    </div>
  );
};
