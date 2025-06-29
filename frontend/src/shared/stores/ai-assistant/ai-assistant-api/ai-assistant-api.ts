import { makeAutoObservable, reaction, type IReactionDisposer } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';
import { toast } from 'sonner';

import { getWelcomeMessage, getChatHistory } from '@/widgets/ai-assistant/components/chat';
import type { Message } from '@/shared/model/Message';
import { sendMessage } from '@/features/send-message';
import { deleteChatHistory } from '@/features/clear-chat';
import { aiAssistantInteractionsStore } from '../ai-assistant-interactions/ai-assistant-interactions';

class AiAssistantApiStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  messages: IPromiseBasedObservable<Message[]> | null = null;
  message: IPromiseBasedObservable<Message> | null = null;
  private _disposer?: IReactionDisposer;

  // ACTIONS
  getChatHistoryAction = async () => {
    const { scrollToBottomChat } = aiAssistantInteractionsStore;
    
    try {
      const res = Promise.all([getWelcomeMessage(), getChatHistory()]);
      const mappedRes = res.then(([aiResponse, history]) => [...history, aiResponse]);

      this.messages = fromPromise(mappedRes);

      this._disposer?.();

      this._disposer = reaction(
        () => this.messages?.state === 'fulfilled',
        (res) => res && scrollToBottomChat()
      );
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

  clearChatAction = async () => {
    const messages = this.messages;

    try {
      this.messages = fromPromise(Promise.resolve([]));
      await deleteChatHistory();
    } catch (e) {
      console.log(e);
      toast.error("Произошла ошибка при очистке чата. Попробуйте позже");
      this.messages = messages;
    }
  }
}

export const aiAssistantApiStore = new AiAssistantApiStore();