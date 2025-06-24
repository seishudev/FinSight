import { Calendar, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

export const userAnalytics = [
   {
      amount: 0,
      type: "balance",
   },
   {
      amount: 0,
      type: "income",
   },
   {
      amount: 0,
      type: "expense",
   },
   {
      amount: 0,
      type: "transactions",
   },
] as const;

export const analyticsPresets = {
   balance: {
      icon: <DollarSign size={20} color="#4ade80" />,
      color: "#4ade80",
      title: "Баланс",
   },
   income: {
      icon: <TrendingUp size={20} color="#4ade80" />,
      color: "#4ade80",
      title: "Доходы"
   },
   expense: {
      icon: <TrendingDown size={20} color="#f87171" />,
      color: "#f87171",
      title: "Расходы"
   },
   transactions: {
      icon: <Calendar size={20} color="#60a5fa" />,
      color: "#60a5fa",
      title: "Транзакций",
   }
}