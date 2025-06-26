import { cloneElement, type JSX } from 'react';
import { Link } from 'react-router'

interface EmptyProps {
  title: string;
  description?: string;
  icon: JSX.Element;
  link?: string;
  linkLabel?: string;
}

export const Empty = ({ icon, title, description, link, linkLabel }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/5 w-fit p-2 mdx:p-3 rounded-xl">{cloneElement(icon, { color: '#9ca3af', size: 48 })}</div>

      <h2 className="text-white text-center mt-3 font-bold text-base mdx:text-lg">{title}</h2>
      <p className="text-xs text-balance text-center mdx:text-sm text-gray-300">{description}</p>

      {link && linkLabel && (
        <Link className="text-white text-center mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-10 py-2 rounded-xl shadow-lg text-sm lg:text-lg scalable-down" to={link}>{linkLabel}</Link>
      )}
    </div>
  );
};
