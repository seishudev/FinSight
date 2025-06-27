import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import type { SpendingCategorie } from '@/shared/interfaces/SpendingCategorie';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { getGradient } from '@/shared/utils/get-gradient';
import { AnalyticsCategory } from '@/entities/analytics-category';
import s from './analytics-categories-modal.module.scss';

interface AnalyticsCategoriesModalProps {
  categories: SpendingCategorie[];
  title: string;
  splicedCategoriesCount?: number;
}

export const AnalyticsCategoriesModal = ({
  title,
  categories,
  splicedCategoriesCount = 3
}: AnalyticsCategoriesModalProps) => {
  const diff = categories.length - splicedCategoriesCount;

  return (
    <Dialog>
      {diff > 0 && (
        <DialogTrigger>
          <p className={s.trigger}>И еще {diff}...</p>
        </DialogTrigger>
      )}

      <DialogContent className={s.modal}>
        <DialogHeader>
          <DialogTitle className={s.title}>{title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className={s.scrollarea}>
          {categories.map(({ categoryId, ...category }, i) => (
            <AnalyticsCategory
              {...category}
              key={categoryId}
              gradient={getGradient(i)}
            />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
