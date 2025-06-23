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
    <div className='auth_form'>
      <div className='insertion'>
        <Logo logoSize={28} className='logo' />
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <form {...otherProps}>
        {children}
        <button type='submit' className='auth_btn'>
          {action}
        </button>
      </form>
    </div>
  );
};
