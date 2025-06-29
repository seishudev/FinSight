import { makeAutoObservable } from 'mobx';

import type { Message } from '@/shared/model/Message';
import { aiAssistantApiStore } from '../ai-assistant-api/ai-assistant-api';

class AiAssistantInteractionsStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  chatRef: HTMLDivElement | null = null;
  message = '';

  // ACTIONS
  pushMessage = (message: Message) => {
    const { messages } = aiAssistantApiStore;

    if (messages?.state === 'fulfilled')
      // @ts-ignore
      messages.value = [...messages.value, message];
  }

  scrollToBottomChat = () => {
    const bottom = this.chatRef?.getBoundingClientRect().bottom;
    this.chatRef?.scrollBy({ behavior: 'smooth', top: bottom })
  }

  // MOVES
  setMessage = (v: string) => (this.message = v);
  setChatRef = (ref: HTMLDivElement) => this.chatRef = ref;
}

export const aiAssistantInteractionsStore = new AiAssistantInteractionsStore();
