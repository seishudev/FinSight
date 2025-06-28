import { makeAutoObservable } from 'mobx';

import type { Message } from '@/shared/model/Message';
import { aiAssistantApiStore } from '../ai-assistant-api/ai-assistant-api';

class AiAssistantInteractionsStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  message = '';

  // MOVES
  setMessage = (v: string) => (this.message = v);
  pushMessage = (message: Message) => {
    const { messages } = aiAssistantApiStore;

    if (messages?.state === 'fulfilled')
      // @ts-ignore
      messages.value = [...messages.value, message];
  }
}

export const aiAssistantInteractionsStore = new AiAssistantInteractionsStore();
