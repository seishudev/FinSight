import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { SelectItem } from '@/shared/interfaces/SelectItem';
import type { TransactionType } from '@/shared/interfaces/TransactionType';
import { transactionTabs } from '@/shared/constants/transaction-tabs';
import { categoriesApiStore } from '@/shared/stores/categories';
import {
  transactionsApiStore,
  transactionsInteractionsStore
} from '@/shared/stores/transactions';
import { FormField, Select } from '@/shared/ui/custom';
import { DatePicker } from '@/shared/ui/custom/DatePicker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';
import { Textarea } from '@/shared/ui/textarea';
import { Tabs } from '@entities/tabs';
import {
  transactionSchema,
  type TransactionBody
} from '../lib/transaction-schema';
import s from './add-transaction-modal.module.scss';

export const AddTransactionModal = observer(() => {
  const { createTransactionAction } = transactionsApiStore;

  const {
    isAddTransactionModalOpen,
    addTransactionInitialData,
    closeAddTransactionModal,
    transactionType,
    setTransactionType,
    isTransactionDatePickerOpen,
    setIsTransactionDatePickerOpen
  } = transactionsInteractionsStore;

  const {
    categoriesExpense,
    categoriesIncome,
    getCategoriesByTypeAction,
    expenseState,
    incomeState
  } = categoriesApiStore;

  const [categoryOptions, setCategoryOptions] = useState<SelectItem[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TransactionBody>({
    // @ts-ignore
    resolver: zodResolver(transactionSchema),
    defaultValues: { date: new Date().toISOString() }
  });

  useEffect(() => {
    if (
      isAddTransactionModalOpen &&
      !addTransactionInitialData &&
      ((transactionType === 'expense' && categoriesExpense.length <= 0) ||
        (transactionType === 'income' && categoriesIncome.length <= 0))
    ) {
      getCategoriesByTypeAction(transactionType);
    }
  }, [
    isAddTransactionModalOpen,
    transactionType,
    getCategoriesByTypeAction,
    addTransactionInitialData
  ]);

  useEffect(() => {
    if (isAddTransactionModalOpen) {
      if (addTransactionInitialData) {
        setTransactionType('expense');
        const options = addTransactionInitialData.allExpenseCategories.map(
          cat => ({
            label: `${cat.icon} ${cat.name}`,
            value: String(cat.id)
          })
        );

        setCategoryOptions(options);

        reset({
          amount: addTransactionInitialData.amount,
          categoryId: addTransactionInitialData.suggestedCategory.id,
          date: addTransactionInitialData.date,
          comment: addTransactionInitialData.comment
        });
      } else {
        const source =
          transactionType === 'income' ? categoriesIncome : categoriesExpense;

        const options = source.map(cat => ({
          label: `${cat.icon} ${cat.name}`,
          value: String(cat.id)
        }));

        setCategoryOptions(options);

        reset({
          amount: undefined,
          categoryId: undefined,
          comment: undefined,
          date: new Date().toISOString()
        });
      }
    }
  }, [
    isAddTransactionModalOpen,
    addTransactionInitialData,
    transactionType,
    categoriesIncome,
    categoriesExpense,
    reset,
    setTransactionType
  ]);

  const handleOpenChange = (open: boolean) => {
    if (!open) closeAddTransactionModal();
  };

  const onSubmit = (data: TransactionBody) => {
    createTransactionAction(data);
    closeAddTransactionModal();
  };

  const isLoadingCategories =
    !addTransactionInitialData &&
    (transactionType === 'expense'
      ? expenseState === 'pending'
      : incomeState === 'pending');

  return (
    <Dialog open={isAddTransactionModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='max-w-[446px]'>
        <DialogHeader>
          <DialogTitle className={s.title}>Новая транзакция</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={transactionType}
          tabs={transactionTabs}
          tabClassName={s.tab}
          tabsClassName={s.tabs}
          onTabChange={v => setTransactionType(v as TransactionType)}
        />

        {/* @ts-ignore */}
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id='amount'
            type='number'
            placeholder='0.00'
            className={s.input}
            error={errors.amount}
            register={register}
            name='amount'
            title='Сумма *'
            valueAsNumber
          />

          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <Select
                values={categoryOptions}
                label='Категория *'
                triggerPlaceholder='Выберите категорию'
                selectPlaceholder='Выберите категорию'
                onValueChange={v => field.onChange(Number(v))}
                isLoading={isLoadingCategories}
                value={field.value ? String(field.value) : undefined}
                error={errors.categoryId?.message}
                emptyText='Отсутствуют категории'
                emptyDesc='Чтобы тут появились значения, вам нужно создать свои категории в разделе "Категории"'
              />
            )}
          />

          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <DatePicker
                date={new Date(field.value)}
                open={isTransactionDatePickerOpen}
                setOpen={setIsTransactionDatePickerOpen}
                onSelect={field.onChange}
                label='Дата'
              />
            )}
          />

          <Controller
            name='comment'
            control={control}
            render={({ field }) => (
              <Textarea
                onChange={field.onChange}
                value={field.value}
                maxLength={128}
                placeholder='Дополнительная информация...'
                label='Комментарий'
                error={errors.comment?.message}
              />
            )}
          />

          <button
            type='submit'
            className={`${s.close} ${transactionType == 'income' ? s.income : s.expense}`}
          >
            Добавить {transactionType == 'income' ? 'доход' : 'расход'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
});
