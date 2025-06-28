import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';

import {
  aiAssistantApiStore,
  aiAssistantInteractionsStore
} from '@/shared/stores/ai-assistant';
import { popularAiQuestions } from '@/shared/constants/popular-ai-questions';
import s from './popular-questions.module.scss';

export const PopularQuestions = observer(() => {
  const { setMessage } = aiAssistantInteractionsStore;
  const { messages } = aiAssistantApiStore;

  if (messages?.state === 'fulfilled' && messages.value.length > 1) return;

  const handleAddQuestionToInput = (e: MouseEvent<HTMLDivElement>) => {
    const element = (e.target as Element).closest('[data-index]');
    if (!element) return;

    const index = element.getAttribute('data-index');
    if (index) setMessage(popularAiQuestions[+index]);
  };

  return (
    <section className={s.popularQuestions}>
      <h3>Популярные вопросы:</h3>

      <div onClick={handleAddQuestionToInput} className={s.questions}>
        {popularAiQuestions.map((question, i) => (
          <div key={i} data-index={i} className={s.question}>
            <p>{question}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
