import { useEffect } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import {
  transactionsApiStore,
  transactionsInteractionsStore
} from '@/shared/stores/transactions';
import { PageTitle } from '@/entities/page-title';
import { Logo } from '@/entities/logo';

export const TransactionsHistory = observer(() => {
  const { transactionsSize, setTransactionsSize } = transactionsInteractionsStore;
  const { getTransactions, transactions } = transactionsApiStore;

  useEffect(() => {
    setTransactionsSize(15);
    getTransactions();
  }, []);

  return (
    <div>
      <PageTitle
        icon={<Logo icon={<BadgeDollarSign />} />}
        title='История транзакций'
        description='Здесь находятся все транзакции, которые вы когда-либо производили'
      />

      {transactions?.state === 'fulfilled' && (
        <>
        </>
      )}
    </div>
  );
});
