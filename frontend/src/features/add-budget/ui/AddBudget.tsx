import { Tabs } from '@entities/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetTabs } from '@shared/constants/budget-tabs';
import { budgetInteractionsStore } from '@shared/stores/budgets/interactions/budgets-interactions';
import type { BudgetType } from '@shared/stores/budgets/interactions/types';
import { Button } from '@shared/ui/button';
import { FormField, Select } from '@shared/ui/custom';
import { DatePicker } from '@shared/ui/custom/DatePicker';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@shared/ui/dialog';
import { Plus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { type BudgetBody, budgetSchema } from '../model/schema';
import s from './AddBudget.module.scss';

export const AddBudget = observer(() => {
  const { budgetType, setBudgetType } = budgetInteractionsStore;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BudgetBody>({
    resolver: zodResolver(budgetSchema)
  });

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

        {/* BUDGET */}
        {budgetType === 'budget' && (
          <div className='flex flex-col gap-6'>
            <Controller
              name='budgetId'
              control={control}
              render={({ field }) => (
                <Select
                  values={[]}
                  label='Категория'
                  selectPlaceholder='Категория'
                  triggerPlaceholder='Выберите категорию'
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <FormField
              id='budget'
              type='text'
              placeholder='5000'
              error={errors.budget}
              register={register}
              name='budget'
              title='Лимит (₽)'
              className={s.input}
            />

            <Controller
              name='periodId'
              control={control}
              render={({ field }) => (
                <Select
                  values={[
                    { label: 'Недельный', value: 'weekly' },
                    { label: 'Месячный', value: 'monthly' },
                    { label: 'Годовой', value: 'yearly' }
                  ]}
                  label='Период'
                  selectPlaceholder='Период'
                  triggerPlaceholder='Выберите период'
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        )}

        {budgetType === 'target' && (
          <div className='flex flex-col gap-6'>
            <FormField
              id='name'
              type='text'
              placeholder='Введите цель...'
              error={errors.name}
              register={register}
              name='name'
              title='Название'
              className={s.input}
            />

            <FormField
              id='amount'
              type='text'
              placeholder='5000'
              error={errors.amount}
              register={register}
              name='amount'
              title='Сумма (₽)'
              className={s.input}
            />

            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={new Date(field.value || Date.now())}
                  open={isDatePickerOpen}
                  setOpen={setIsDatePickerOpen}
                  onSelect={field.onChange}
                  label='Дата'
                />
              )}
            />
          </div>
        )}

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
