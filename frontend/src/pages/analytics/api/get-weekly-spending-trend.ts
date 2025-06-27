import type { Spending } from '@/shared/model/Spending';
import { api } from '@/shared/api'

export const getWeeklytSpendingTrend = async () => {
   const res = await api.get<Spending[]>("/analytics/trend/last-7-days");

   return res.data;
}