import { Sparkles } from 'lucide-react';

import type { Message as MessageModel } from '@/shared/model/Message';
import { cn } from '@/shared/utils/tw-merge';
import s from './message.module.scss';

export const Message = ({
  content,
  role
}: Pick<MessageModel, 'content' | 'role'>) => {
  return (
    <div className={cn(s.container, role === 'user' && s.userMessage)}>
      <h4 className={s.role}>
        {role === 'user' ? (
          'Вы'
        ) : (
          <span>
            <Sparkles size={16} /> AI Помощник
          </span>
        )}
      </h4>

      <p className={s.content}>{content}</p>
    </div>
  );
};
