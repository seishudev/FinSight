import { useEffect } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import ResponsivePagination from 'react-responsive-pagination';

import {
  transactionsApiStore,
  transactionsInteractionsStore
} from '@/shared/stores/transactions';
import { cn } from '@/shared/utils/tw-merge';
import { Logo } from '@/entities/logo';
import { Skeleton } from '@/shared/ui/skeleton';
import { PageTitle } from '@/entities/page-title';
import { Transaction } from '@/entities/transaction';
import s from './transactions-history.module.scss';

export const TransactionsHistory = observer(() => {
  const {
    transactionsPage,
    transactionsTotalPages,
    setTransactionsSize,
    setTransactionsPage
  } = transactionsInteractionsStore;

  const { getTransactions, transactions } = transactionsApiStore;

  useEffect(() => {
    setTransactionsSize(10);
    getTransactions();
  }, [transactionsPage]);

  return (
    <div>
      <PageTitle
        icon={<Logo icon={<BadgeDollarSign />} />}
        title='История транзакций'
        description='Здесь находятся все транзакции, которые вы когда-либо производили'
      />

      <div className={s.content}>
        {!transactionsTotalPages ? (
          <Skeleton className={s.paginationSkeleton} />
        ) : (
          <ResponsivePagination
            current={transactionsPage + 1}
            total={transactionsTotalPages!}
            onPageChange={p => setTransactionsPage(p - 1)}
          />
        )}

        {transactions?.state === 'pending' && (
          <div className={cn(s.transactions, transactionsTotalPages && "mt-8")}>
            {Array(10)
              .fill('')
              .map((_, i) => (
                <Skeleton key={i} className="h-[76px]" />
              ))}
          </div>
        )}

        {transactions?.state === 'fulfilled' && (
          <div className={cn(s.transactions, transactionsTotalPages && "mt-8")}>
            {transactions.value.map(transaction => (
              <Transaction key={transaction.id} {...transaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
