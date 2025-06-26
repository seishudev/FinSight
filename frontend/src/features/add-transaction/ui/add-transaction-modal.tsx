import { CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from '@/shared/ui/custom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import { Select } from '@/shared/ui/custom';
import {
  // transactionsApiStore,
  transactionsInteractionsStore,
  type TransactionType
} from '@/shared/stores/transactions';
import { transactionTabs } from '@/shared/constants/transaction-tabs';
import { Button } from '@/shared/ui/button';
import { DatePicker } from '@/shared/ui/custom/DatePicker';
import { Textarea } from '@/shared/ui/textarea';
import { Tabs } from '@entities/tabs';
import { transactionSchema, type TransactionBody } from '../lib/transaction-schema';
import s from './add-transaction-modal.module.scss';

export const AddTransactionModal = observer(() => {
  // const { createTransactionAction } = transactionsApiStore;

  const {
    transactionType,
    setTransactionType,
    isTransactionDatePickerOpen,
    setIsTransactionDatePickerOpen
  } = transactionsInteractionsStore;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TransactionBody>({
    resolver: zodResolver(transactionSchema),
  });

  return (
    <Dialog onOpenChange={() => setTransactionType('expense')}>
      <DialogTrigger asChild>
        <Button className={s.addTransaction}>
          <CirclePlus />
          Добавить транзакцию
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[446px]">
        <DialogHeader>
          <DialogTitle className={s.title}>Новая транзакция</DialogTitle>
        </DialogHeader>

        <Tabs
          tabs={transactionTabs}
          tabClassName={s.tab}
          tabsClassName={s.tabs}
          onTabChange={v => setTransactionType(v as TransactionType)}
        />

        <form
          className={s.form}
          onSubmit={handleSubmit(data => console.log(data))}
        >
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
                values={[{ label:"dfdg", value: "fdg" }]}
                label='Категория *'
                onValueChange={field.onChange}
                selectPlaceholder='Выберите категорию'
                triggerPlaceholder='Выберите категорию'
                // @ts-ignore
                value={field.value}
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
