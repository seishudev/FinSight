import { observer } from 'mobx-react-lite';
import { Trash2 } from 'lucide-react';

import { aiAssistantApiStore } from '@/shared/stores/ai-assistant';
import s from './clear-chat.module.scss';

export const ClearChat = observer(() => {
  const { clearChatAction } = aiAssistantApiStore;

  return (
    <button onClick={clearChatAction} className={s.clearChat}>
      <Trash2 size={18} />
    </button>
  );
});
