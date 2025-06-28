import type { ChatRole } from '../interfaces/ChatRole'

export interface Message {
   id: number;
   content: string;
   role: ChatRole;
   createdAt: string;
}