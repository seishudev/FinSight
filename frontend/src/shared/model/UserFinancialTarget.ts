import type { FinancialTargetType } from '../interfaces/FinancialTargetType';
import type { Budget, Target } from './Budget';

export interface UserFinancialTarget {
  type: FinancialTargetType;
  goal: Target;
  budget: Budget;
}
