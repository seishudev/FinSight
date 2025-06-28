import { budgetsApiStore } from '@/shared/stores/budgets';
import { createBudgetApi } from '@/shared/stores/budgets/api/create-budget-api';
import { createTargetApi } from '@/shared/stores/budgets/api/create-target-api';
import type { Category } from '@/shared/stores/categories';
import { categoriesApiStore } from '@/shared/stores/categories';
import { Tabs } from '@entities/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetTabs } from '@shared/constants/budget-tabs';
import type { SelectItem } from '@shared/interfaces/SelectItem';
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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type BudgetBody, budgetSchema } from '../model/schema';
import s from './AddBudget.module.scss';

export const AddBudget = observer(() => {
  const { budgetType, setBudgetType } = budgetInteractionsStore;
  const { categoriesExpense, getCategoriesByTypeAction, expenseState } =
    categoriesApiStore;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BudgetBody>({
    resolver: zodResolver(budgetSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    if (isModalOpen) {
      getCategoriesByTypeAction('expense');
    }
  }, [isModalOpen, getCategoriesByTypeAction]);

  const handleClose = () => {
    setBudgetType('target');
    setIsModalOpen(true);
  };

  const categoryOptions: SelectItem[] =
    expenseState === 'fulfilled'
      ? categoriesExpense.map((cat: Category) => ({
          label: `${cat.icon} ${cat.name}`,
          value: String(cat.id)
        }))
      : [];

  const onSubmit = (data: BudgetBody) => {
    if (budgetType === 'budget') {
      createBudgetApi(Number(data.budgetId), data.budget!, data.periodId!)
        .then(newBudget => {
          budgetsApiStore.addBudgetAction(newBudget);
          toast.success('Бюджет успешно создан!');
          setIsModalOpen(false);
        })
        .catch(e => {
          toast.error('Ошибка при создании бюджета');
          console.error(e);
        });
    } else {
      createTargetApi(
        data.name!,
        '🎯',
        data.amount!,
        new Date(data.date!).toISOString()
      )
        .then(newTarget => {
          budgetsApiStore.addTargetAction(newTarget);
          toast.success('Цель успешно создана!');
          setIsModalOpen(false);
        })
        .catch(e => {
          toast.error('Ошибка при создании цели');
          console.error(e);
        });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      reset();
      setBudgetType('target');
    }
    setIsModalOpen(open);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Tabs
            tabs={budgetTabs}
            tabClassName={s.tab}
            tabsClassName={s.tabs}
            onTabChange={v => {
              setBudgetType(v as BudgetType);
              reset();
            }}
          ></Tabs>

          {/* BUDGET */}
          {budgetType === 'budget' && (
            <>
              <Controller
                name='budgetId'
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      values={categoryOptions}
                      label='Категория'
                      selectPlaceholder='Категория'
                      triggerPlaceholder='Выберите категорию'
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                    {errors.budgetId && (
                      <span className={s.error}>{errors.budgetId.message}</span>
                    )}
                  </div>
                )}
              />

              <FormField
                id='budget'
                type='text'
                placeholder='10000'
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
                  <div>
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
                    {errors.periodId && (
                      <span className={s.error}>{errors.periodId.message}</span>
                    )}
                  </div>
                )}
              />
            </>
          )}

          {budgetType === 'target' && (
            <>
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
                placeholder='15000'
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
                  <div>
                    <DatePicker
                      date={new Date(field.value || Date.now())}
                      open={isDatePickerOpen}
                      setOpen={setIsDatePickerOpen}
                      onSelect={field.onChange}
                      label='Дата'
                    />
                    {errors.date && (
                      <span className={s.error}>{errors.date.message}</span>
                    )}
                  </div>
                )}
              />
            </>
          )}

          <DialogFooter>
            <Button
              type='submit'
              className={`${s.close} ${budgetType === 'target' ? s.target : s.budget}`}
            >
              Добавить {budgetType === 'target' ? 'цель' : 'бюджет'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
