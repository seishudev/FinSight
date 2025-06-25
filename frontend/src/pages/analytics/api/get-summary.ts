import { api } from '@/shared/api';
import type { UserSummaryAnalytics } from '@/shared/model/UserSummaryAnalytics'

export const getUserSummary = async () => {
   const res = await api.get<UserSummaryAnalytics[]>("/analytics/summary/current-month");

   console.log(res.data);
   return res.data
}