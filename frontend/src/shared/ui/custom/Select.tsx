import { nanoid } from 'nanoid';

import type { SelectItem as SelectUiItem } from '@/shared/interfaces/SelectItem';
import { cn } from '@/shared/utils/tw-merge';
import { Label } from '../label';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  Select as SelectUi,
  SelectValue
} from '../select';

interface SelectProps {
  value?: string;
  label?: string;
  values: SelectUiItem[];
  selectPlaceholder?: string;
  triggerPlaceholder?: string;
  onValueChange?: (value: string) => void;
}

export const Select = ({
  label,
  value,
  values,
  onValueChange,
  selectPlaceholder,
  triggerPlaceholder
}: SelectProps) => {
  return (
    <div>
      {label && <Label className='text-gray-300'>{label}</Label>}
      <SelectUi onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={cn(
            'bg-white/5 border px-4 py-[24px] border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 hover:bg-white/5 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base',
            label && 'mt-2'
          )}
        >
          <SelectValue placeholder={triggerPlaceholder} />
        </SelectTrigger>
        <SelectContent className='bg-gray-900 border border-gray-700 rounded-xl'>
          <SelectGroup>
            {selectPlaceholder && (
              <SelectLabel>{selectPlaceholder}</SelectLabel>
            )}

            {values.map(({ label, value }) => (
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
