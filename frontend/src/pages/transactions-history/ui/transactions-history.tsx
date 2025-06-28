import { BadgeDollarSign } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Logo } from '@/entities/logo';
import { PageTitle } from '@/entities/page-title';
import {
  transactionsApiStore,
  transactionsInteractionsStore
} from '@/shared/stores/transactions';

export const TransactionsHistory = observer(() => {
  const { setTransactionsSize } = transactionsInteractionsStore;
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

      {transactions?.state === 'fulfilled' && <></>}
    </div>
  );
});
