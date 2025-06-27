import type { CategoriesAnalytics } from '@/shared/model/CategoriesAnalytics';
import { api } from '@/shared/api'

export const getCategoriesAnalytics = async () => {
   const res = await api.get<CategoriesAnalytics>("analytics/categories/current-month");

   return res.data;
}