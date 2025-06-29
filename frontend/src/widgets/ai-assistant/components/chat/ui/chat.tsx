import { useEffect, useRef, type RefObject } from 'react';
import { observer } from 'mobx-react-lite';

import { aiAssistantApiStore, aiAssistantInteractionsStore } from '@/shared/stores/ai-assistant';
import { Message } from '@/entities/message';
import { BounceLoader } from '@/entities/bounce-loader';
import { MessagesPending } from '../components/messages-pending';
import s from './chat.module.scss';

export const Chat = observer(() => {
  const chatRef: RefObject<HTMLDivElement | null> = useRef(null);

  const { messages, getChatHistoryAction, message } = aiAssistantApiStore;
  const { setChatRef } = aiAssistantInteractionsStore;

  useEffect(() => {
    if (chatRef.current) setChatRef(chatRef.current);
    if (messages?.state !== 'fulfilled') getChatHistoryAction();
  }, []);

  return (
    <div ref={chatRef} className={s.chat}>
      {/* MESSAGES */}
      {messages?.state === 'pending' && <MessagesPending />}

      {messages?.state === 'fulfilled' && (
        <>
          {messages.value.map(({ content, role, id }) => (
            <Message key={id} content={content} role={role} />
          ))}
        </>
      )}

      {/* AI REPEATING ANIMATION */}
      {message?.state === 'pending' && <BounceLoader />}

      <div id="bottom-scroller" />
    </div>
  );
});
