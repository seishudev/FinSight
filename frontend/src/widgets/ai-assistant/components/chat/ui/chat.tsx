import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { aiAssistantApiStore } from '@/shared/stores/ai-assistant';
import { Message } from '@/entities/message';
import s from './chat.module.scss';

export const Chat = observer(() => {
  const { messages, getChatHistoryAction } = aiAssistantApiStore;

  useEffect(() => {
    getChatHistoryAction();
  }, []);

  return (
    <div className={s.chat}>
      {messages?.state === 'pending' && <>Загрузка</>}

      {messages?.state === 'fulfilled' && (
        <>
          {messages.value.map(({ content, role, id }) => (
            <Message key={id} content={content} role={role} />
          ))}
        </>
      )}
    </div>
  );
});
