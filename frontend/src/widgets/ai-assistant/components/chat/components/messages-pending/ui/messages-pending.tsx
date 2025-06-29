import { Skeleton } from '@/shared/ui/skeleton';
import { cn } from '@/shared/utils/tw-merge';
import s from './messages-pending.module.scss';

export const MessagesPending = () => {
  return (
    <>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <Skeleton
            className={cn(s.skeleton, (i + 1) % 2 == 0 ? 'ml-auto block' : '')}
          />
        ))}
    </>
  );
};
