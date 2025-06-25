import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import { transactionTabs } from '@/shared/constants/transaction-tabs';
import {
  transactionsInteractionsStore,
  type TransactionType
} from '@/shared/stores/transactions';
import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/custom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import { Tabs } from '@entities/tabs';
import {
  transactionSchema,
  type TransactionBody
} from '../lib/transaction-schema';
import s from './add-transaction-modal.module.scss';

export const AddTransactionModal = observer(() => {
  const { transactionType, setTransactionType } = transactionsInteractionsStore;

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<TransactionBody>({
    resolver: zodResolver(transactionSchema)
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={s.addTransaction}>
          <CirclePlus />
          Добавить транзакцию
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className={s.title}>Новая транзакция</DialogTitle>
        </DialogHeader>

        <Tabs
          tabs={transactionTabs}
          tabClassName={s.tab}
          tabsClassName={s.tabs}
          onTabChange={v => setTransactionType(v as TransactionType)}
        />

        <form onSubmit={handleSubmit(() => console.log('submit'))}>
          {/* TODO: Separate it into another file */}
          <FormField
            id='quantity'
            type='number'
            placeholder='0.00'
            error={errors.quantity}
            register={register}
            name='quantity'
            title='Сумма *'
            valueAsNumber
          />

          <FormField
            id='comment'
            type='text'
            error={errors.comment}
            maxLength={300}
            register={register}
            name='comment'
            title='Комментарий'
            placeholder='Дополнительная информация...'
          />

          <DialogClose
            type='submit'
            className={`${s.close} ${transactionType == 'income' ? s.income : s.expense}`}
          >
            Добавить {transactionType == 'income' ? 'доход' : 'расход'}
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
});
