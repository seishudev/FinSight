import { makeAutoObservable, reaction, type IReactionDisposer } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import type { Message } from '@/shared/model/Message';
import { aiAssistantInteractionsStore } from '../ai-assistant-interactions/ai-assistant-interactions'
import { sendMessage } from '@/features/send-message/api/send-message'
import { getWelcomeMessage } from '@/widgets/ai-assistant/components/chat/api/get-welcome-message'
import { getChatHistory } from '@/widgets/ai-assistant/components/chat/api/get-chat-history'

class AiAssistantApiStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  messages: IPromiseBasedObservable<Message[]> | null = null;
  message: IPromiseBasedObservable<Message> | null = null;
  private _disposer?: IReactionDisposer;

  // ACTIONS
  getChatHistoryAction = async () => {
    try {
      const [startMessage, history] = await Promise.all([getWelcomeMessage(), getChatHistory()]);
      const res = Promise.resolve([...history, startMessage]);

      this.messages = fromPromise(res);
    } catch (e) { console.log(e) }
  }

  sendMessageAction = () => {
    const { message, pushMessage, setMessage } = aiAssistantInteractionsStore;

    if (!message.trim() || this.message?.state === 'pending') return;

    try {
      const userMessage: Message = {
        id: 1,
        content: message,
        createdAt: new Date().toISOString(),
        role: "user"
      };

      pushMessage(userMessage);
      this.message = fromPromise(sendMessage(message));

      this._disposer?.();
      
      this._disposer = reaction(
        () => this.message?.state === 'fulfilled',
        (res) => res && pushMessage(this.message?.value as Message)
      );

      setMessage('');
    } catch(e) { console.log(e) }
  }
}

export const aiAssistantApiStore = new AiAssistantApiStore();