import { motion } from 'framer-motion';

import { cn } from '@/shared/utils/tw-merge';
import s from './bounce-loader.module.scss';

export const BounceLoader = ({ className }: { className?: string }) => {
  const dots = [0, 1, 2];

  return (
    <div className={cn(s.container, className)}>
      {dots.map(dot => (
        <motion.span
          key={dot}
          className={s.dot}
          initial={{
            y: 0,
            scale: 1,
            opacity: 1
          }}
          animate={{
            y: [0, -1.25, 0],
            scale: [1, 1.2, 1],
            backgroundColor: ['#fff', '#5a5a5ad3', '#fff']
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  );
};
