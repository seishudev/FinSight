import type { Message } from '@/shared/model/Message';
import { api } from '@/shared/api'

export const sendMessage = async (message: string) => {
   const res = await api.post<Message>("/ai/chat", { message });

   return res.data;
}