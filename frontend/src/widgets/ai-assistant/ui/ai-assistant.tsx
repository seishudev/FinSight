import { Bot } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/shared/ui/sheet';
import { SendMessage } from '@/features/send-message';
import { ClearChat } from '@/features/clear-chat';
import { PageTitle } from '@/entities/page-title';
import { Logo } from '@/entities/logo';
import { Chat } from '../components/chat';
import { PopularQuestions } from '../components/popular-questions';
import s from './ai-assistant.module.scss';

export const AiAssistant = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Bot />
          AI Помощник
        </button>
      </SheetTrigger>

      <SheetContent side='left' className={s.content}>
        <SheetTitle className={s.title}>
          <PageTitle
            icon={<Logo icon={<Bot />} />}
            title='AI Помощник'
            description='Финансовый консультант'
          />

          <ClearChat />
        </SheetTitle>

        <Chat />
        <PopularQuestions />
        <SendMessage />
      </SheetContent>
    </Sheet>
  );
};
