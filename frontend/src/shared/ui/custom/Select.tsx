import type { JSX } from 'react';
import { nanoid } from 'nanoid';
import { Ban } from 'lucide-react';

import { LoadingIcon } from '@/shared/assets/icons/LoadingIcon';
import type { SelectItem as SelectUiItem } from '@/shared/interfaces/SelectItem';
import { cn } from '@/shared/utils/tw-merge';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  Select as SelectUi,
  SelectValue
} from '../select';
import { Label } from '../label';
import { Empty } from './Empty';

interface SelectProps {
  value?: string;
  label?: string;
  values: SelectUiItem[] | null;
  isLoading?: boolean;
  selectPlaceholder?: string;
  triggerPlaceholder?: string;
  onValueChange?: (value: string) => void;
  emptyText?: string;
  emptyDesc?: string;
  emptyIcon?: JSX.Element;
  error?: string;
}

export const Select = ({
  label,
  error,
  value,
  values,
  emptyDesc,
  emptyIcon = <Ban />,
  emptyText = 'Отсутствуют значения',
  onValueChange,
  isLoading = false,
  selectPlaceholder,
  triggerPlaceholder
}: SelectProps) => {
  return (
    <div>
      {label && <Label className='text-gray-300'>{label}</Label>}
      <SelectUi onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={cn(
            'bg-white/5 border px-4 py-[22px] border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 hover:bg-white/5 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base',
            label && 'mt-2'
          )}
        >
          <SelectValue placeholder={triggerPlaceholder} />
        </SelectTrigger>

        {error && <span className="mt-2 inline-block text-xs smx:text-sm text-red-600">{error}</span>}

        <SelectContent className='max-h-96 bg-gray-800 backdrop-blur-3xl rounded-xl'>
          <SelectGroup>
            {selectPlaceholder && (
              <SelectLabel>{selectPlaceholder}</SelectLabel>
            )}

            {isLoading && (
              <Empty
                title='Подождите, идет загрузка...'
                icon={<LoadingIcon />}
                className='my-5 [&>h2]:text-sm [&>h2]:mt-1'
              />
            )}

            {(values?.length || 0) <= 0 && (
              <Empty
                icon={emptyIcon}
                title={emptyText}
                description={emptyDesc}
                className="[&>p]:mb-2 [&>p]:max-w-72"
              />
            )}

            {values?.map(({ label, value }) => (
              <SelectItem
                className='focus:bg-transparent'
                onClick={() => console.log('click')}
                key={nanoid(4)}
                value={value}
              >
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUi>
    </div>
  );
};
