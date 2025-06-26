import { createNewCategory } from '@/shared/stores/categories/api/create-new-category';
import { Tabs } from '@entities/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { categoryTabs } from '@shared/constants/category-tabs';
import {
  categoriesApiStore,
  categoriesInteractionsStore
} from '@shared/stores/categories';
import type { CategoryType } from '@/shared/stores/categories/interactions/types';
import { Button } from '@shared/ui/button';
import { FormField } from '@shared/ui/custom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@shared/ui/dialog';
import EmojiPicker, {
  Emoji,
  Theme as EmojiTheme,
  SkinTonePickerLocation,
  type EmojiClickData
} from 'emoji-picker-react';
import { Plus, Smile } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { categorySchema, type CategoryBody } from '../model/categorySchema';
import s from './CategoryDialog.module.scss';

export const CategoryDialog = observer(() => {
  const { categoryType, setCategoryType } = categoriesInteractionsStore;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch
  } = useForm<CategoryBody>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: '',
      emoji: '💵'
    }
  });

  const currentEmoji = watch('emoji');

  const onEmojiClick = (data: EmojiClickData) => {
    setValue('emoji', data.emoji);
    setShowEmojiPicker(false);
  };

  const onSubmit = (data: CategoryBody) => {
    createNewCategory(data.title, data.emoji, categoryType)
      .then(() => categoriesApiStore.getCategoriesByTypeAction(categoryType))
      .catch(err => console.error(err));

    setIsModalOpen(false);
    reset();
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentEmoji]);

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
            placeholder='Введите название категории...'
            error={errors.title}
            register={register}
            name='title'
            title='Название'
            className={s.input}
          />
          <div className='mt-5'>
            <div className='flex gap-3 items-center'>
              <div className='relative'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={s.emojiButton}
                >
                  Добавить иконку
                </Button>
                {showEmojiPicker && (
                  <div ref={emojiPickerRef} className={s.emojiPickerWrapper}>
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      autoFocusSearch={false}
                      theme={EmojiTheme.DARK}
                      lazyLoadEmojis
                      skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                      height={350}
                      width='100%'
                    />
                  </div>
                )}
              </div>
              <div className='flex-shrink-0'>
                {currentEmoji ? (
                  <Emoji
                    unified={currentEmoji.codePointAt(0)?.toString(16) || ''}
                    size={28}
                  />
                ) : (
                  <Smile size={28} />
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              className={`${s.close} ${categoryType === 'income' ? s.income : s.expense}`}
            >
              Добавить категорию
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
