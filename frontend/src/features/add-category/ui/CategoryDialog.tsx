import { Tabs } from '@entities/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { categoryTabs } from '@shared/constants/category-tabs';
import { categoriesInteractionsStore } from '@shared/stores/categories';
import type { CategoryType } from '@shared/stores/categories/interactions/types';
import { Button } from '@shared/ui/button';
import { FormField } from '@shared/ui/custom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@shared/ui/dialog';
import { Plus } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { categorySchema, type CategoryBody } from '../model/categorySchema';
import s from './CategoryDialog.module.scss';

export const CategoryDialog = observer(() => {
  const { categoryType, setCategoryType } = categoriesInteractionsStore;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<CategoryBody>({
    resolver: zodResolver(categorySchema)
  });

  const onSubmit = () => {
    console.log('артур идет нахуй');
    setIsModalOpen(false);
    reset();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className={s.btn} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Добавить категорию
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] bg-gray-900/95'>
        <DialogHeader className={s.title}>
          <DialogTitle className='text-lg mdx:text-xl font-semibold text-white'>
            Новая категория
          </DialogTitle>
        </DialogHeader>

        <Tabs
          tabs={categoryTabs}
          tabClassName={s.tab}
          tabsClassName={s.tabs}
          onTabChange={v => setCategoryType(v as CategoryType)}
        ></Tabs>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id='title'
            type='text'
            placeholder='Название новой категории...'
            error={errors.title}
            register={register}
            name='title'
            title='Название'
            className={s.input}
          />

          <DialogFooter>
            <Button
              type='submit'
              className={`${s.close} ${categoryType == 'income' ? s.income : s.expense}`}
            >
              Добавить категорию
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
