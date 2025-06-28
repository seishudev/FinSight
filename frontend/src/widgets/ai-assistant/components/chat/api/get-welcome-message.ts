import type { Message } from '@/shared/model/Message';
import { api } from '@/shared/api'

export const getWelcomeMessage = async () => {
   const res = await api.get<Message>("/ai/chat/welcome");

   return res.data;
}