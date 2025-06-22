import { Logo } from '@entities/logo';
import type { FormHTMLAttributes, ReactNode } from 'react';

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  description: string;
  action: string;
  children: ReactNode;
}

export const AuthForm = (props: AuthFormProps) => {
  const { title, description, action, children, ...otherProps } = props;

  return (
    <div>
      <Logo />
      <h1>{title}</h1>
      <p>{description}</p>
      <form {...otherProps}>
        {children}
        <button type='submit'>{action}</button>
      </form>
    </div>
  );
};
