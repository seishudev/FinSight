import { Send } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FormEvent } from 'react';

import {
  aiAssistantApiStore,
  aiAssistantInteractionsStore
} from '@/shared/stores/ai-assistant';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import s from './send-message.module.scss';

export const SendMessage = observer(() => {
  const { sendMessageAction } = aiAssistantApiStore;
  const { message, setMessage } = aiAssistantInteractionsStore;

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageAction();
  };

  return (
    <form onSubmit={handleSendMessage} className={s.input}>
      <Input
        value={message}
        placeholder='Задайте вопрос...'
        className={s.field}
        onChange={e => setMessage(e.target.value)}
      />

      <Button type='submit' disabled={!message.trim()} className={s.send}>
        <Send />
      </Button>
    </form>
  );
});
