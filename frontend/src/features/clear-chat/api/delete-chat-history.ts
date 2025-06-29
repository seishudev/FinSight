import { api } from '@/shared/api';

export const deleteChatHistory = () => api.delete('/ai/chat/clean');
