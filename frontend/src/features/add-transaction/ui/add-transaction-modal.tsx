import { CirclePlus } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import { transactionsInteractionsStore } from '@/shared/stores/transactions';
import { transactionTabs } from '@/shared/constants/transaction-tabs';
import { Button } from '@/shared/ui/button';
import { Tabs } from '@entities/tabs';
import s from './add-transaction-modal.module.scss';

export const AddTransactionModal = observer(() => {
  const { transactionType, setTransactionType } = transactionsInteractionsStore;

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
          onTabChange={setTransactionType}
        />

        <DialogClose></DialogClose>
      </DialogContent>
    </Dialog>
  );
});
