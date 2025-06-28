import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createTransaction } from '@/pages/analytics';
import { transactionTabs } from '@/shared/constants/transaction-tabs';
import type { SelectItem } from '@/shared/interfaces/SelectItem';
import { categoriesApiStore } from '@/shared/stores/categories';
import {
  transactionsApiStore,
  transactionsInteractionsStore,
  type TransactionType
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
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString()
    }
  });

  useEffect(() => {
    if (isAddTransactionModalOpen && !addTransactionInitialData) {
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
          quantity: addTransactionInitialData.amount,
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
          quantity: undefined,
          categoryId: undefined,
          date: new Date().toISOString(),
          comment: ''
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
    if (!open) {
      closeAddTransactionModal();
    }
  };

  const onSubmit = async (data: TransactionBody) => {
    const transactionData = { ...data, type: transactionType };
    try {
      const newTransaction = await createTransaction(transactionData as any);
      if (transactionsApiStore.transactions?.state === 'fulfilled') {
        transactionsApiStore.transactions.value.unshift(newTransaction);
      }
      toast.success('Транзакция успешно добавлена!');
      closeAddTransactionModal();
    } catch (e) {
      toast.error('Ошибка при создании транзакции');
      console.error(e);
    }
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

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id='quantity'
            type='number'
            placeholder='0.00'
            className={s.input}
            error={errors.quantity}
            register={register}
            name='quantity'
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
                onValueChange={v => field.onChange(Number(v))}
                selectPlaceholder={
                  isLoadingCategories ? 'Загрузка...' : 'Выберите категорию'
                }
                triggerPlaceholder={
                  isLoadingCategories ? 'Загрузка...' : 'Выберите категорию'
                }
                value={String(field.value)}
              />
            )}
          />

          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <DatePicker
                date={new Date(field.value || Date.now())}
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
                value={field.value!}
                maxLength={128}
                placeholder='Дополнительная информация...'
                label='Комментарий'
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
