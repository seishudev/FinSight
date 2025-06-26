import { budgetTabs } from '@/shared/constants/budget-tabs';
import { budgetInteractionsStore } from '@/shared/stores/budgets/interactions/budgets-interactions';
import type { BudgetType } from '@/shared/stores/budgets/interactions/types';
import { Tabs } from '@entities/tabs';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@shared/ui/dialog';
import { Plus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import s from './AddButton.module.scss';

export const AddBudget = observer(() => {
  const { budgetType, setBudgetType } = budgetInteractionsStore;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setBudgetType('target');
    setIsModalOpen(true);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className={s.btn} onClick={handleClose}>
          <Plus size={18} />
          Создать
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] bg-gray-900/95'>
        <DialogHeader>
          <DialogTitle className='text-lg mdx:text-xl font-semibold text-white'>
            {budgetType === 'target' ? 'Новая цель' : 'Новый бюджет'}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          tabs={budgetTabs}
          tabClassName={s.tab}
          tabsClassName={s.tabs}
          onTabChange={v => setBudgetType(v as BudgetType)}
        ></Tabs>

        <DialogFooter>
          <Button
            type='submit'
            className={`${s.close} ${budgetType === 'target' ? s.target : s.budget}`}
          >
            Добавить {budgetType === 'target' ? 'цель' : 'бюджет'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
