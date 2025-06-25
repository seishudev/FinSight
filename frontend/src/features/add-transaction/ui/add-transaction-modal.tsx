import { CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from '@/shared/ui/custom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';
import {
  // transactionsApiStore,
  transactionsInteractionsStore,
  type TransactionType
} from '@/shared/stores/transactions';
import { transactionTabs } from '@/shared/constants/transaction-tabs';
import { Button } from '@/shared/ui/button';
import { Tabs } from '@entities/tabs';
import {
  transactionSchema,
  type TransactionBody
} from '../lib/transaction-schema';
import s from './add-transaction-modal.module.scss';
import { DatePicker } from '@/shared/ui/custom/DatePicker';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';

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
    resolver: zodResolver(transactionSchema)
  });

  return (
    <Dialog onOpenChange={() => setTransactionType('expense')}>
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
            name='category'
            control={control}
            render={({ field }) => (
              <div>
                <Label>Категория *</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите категорию' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выберите категорию</SelectLabel>
                      <SelectItem value='apple'>Apple</SelectItem>
                      <SelectItem value='banana'>Banana</SelectItem>
                      <SelectItem value='blueberry'>Blueberry</SelectItem>
                      <SelectItem value='grapes'>Grapes</SelectItem>
                      <SelectItem value='pineapple'>Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
                label="Дата"
              />
            )}
          />

          <Controller
            name='comment'
            control={control}
            render={({ field }) => (
              <div>
                <Label>Комментарий</Label>
                <Textarea
                  onChange={field.onChange}
                  value={field.value!}
                  placeholder='Дополнительная информация...'
                />
              </div>
            )}
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
