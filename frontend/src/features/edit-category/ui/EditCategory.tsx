import { editCategoryApi } from '@/shared/stores/categories/api/edit-category-api';
import { Tabs } from '@entities/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { categoryTabs } from '@shared/constants/category-tabs';
import {
  categoriesApiStore,
  categoriesInteractionsStore
} from '@shared/stores/categories';
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
import EmojiPicker, {
  Emoji,
  Theme as EmojiTheme,
  SkinTonePickerLocation,
  type EmojiClickData
} from 'emoji-picker-react';
import { Edit2, Smile } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { categorySchema, type CategoryBody } from '../model/categorySchema';
import s from './EditCategory.module.scss';

interface EditCategoryProps {
  id: number;
  name: string;
  icon: string;
  initialCategoryType: CategoryType;
}

export const EditCategory = observer((props: EditCategoryProps) => {
  const { id, name, icon, initialCategoryType } = props;

  const storeCategoryType = categoriesInteractionsStore.categoryType;
  const setStoreCategoryType = categoriesInteractionsStore.setCategoryType;

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
      title: name,
      emoji: icon
    }
  });

  useEffect(() => {
    if (isModalOpen) {
      setStoreCategoryType(initialCategoryType);
      reset({
        title: name,
        emoji: icon
      });
    }
  }, [
    isModalOpen,
    initialCategoryType,
    name,
    icon,
    setStoreCategoryType,
    reset
  ]);

  const handleDialogVisibilityChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setShowEmojiPicker(false);
    }
  };

  const currentEmoji = watch('emoji');

  const onEmojiClick = (data: EmojiClickData) => {
    setValue('emoji', data.emoji);
    setShowEmojiPicker(false);
  };

  const onSubmit = (data: CategoryBody) => {
    const currentSelectedTypeInModal = categoriesInteractionsStore.categoryType;

    editCategoryApi(id, data.title, data.emoji, currentSelectedTypeInModal)
      .then(() => {
        categoriesApiStore.getCategoriesByTypeAction(
          currentSelectedTypeInModal
        );

        if (initialCategoryType !== currentSelectedTypeInModal) {
          categoriesApiStore.getCategoriesByTypeAction(initialCategoryType);
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsModalOpen(false);
        setShowEmojiPicker(false);
      });

    setIsModalOpen(false);
    reset();
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    function handleClickOutsideEmojiPicker(e: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideEmojiPicker);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEmojiPicker);
    };
  }, [showEmojiPicker]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <button className={s.edit}>
          <Edit2 size={14} className='text-gray-400' />
        </button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] bg-gray-900/95'>
        <DialogHeader className={s.title}>
          <DialogTitle className='text-lg mdx:text-xl font-semibold text-white'>
            Редактирование категории
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
                  Изменить иконку
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
              Изменить категорию
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
