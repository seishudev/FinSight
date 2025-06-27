import { gradients } from '../constants/analytics-categories-gradients';

export const getGradient = (index: number) => gradients[index % gradients.length];