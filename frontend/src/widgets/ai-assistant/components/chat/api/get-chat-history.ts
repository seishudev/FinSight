import type { Message } from '@/shared/model/Message';
import { api } from '@/shared/api';

export const getChatHistory = async () => {
   const res = await api.get<Message[]>("/ai/chat/history");

   return res.data;   
}