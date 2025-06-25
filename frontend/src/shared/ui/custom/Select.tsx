import { nanoid } from 'nanoid';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  Select as SelectUi,
  SelectValue
} from '../select';
import type { SelectItem as SelectUiItem } from '@/shared/interfaces/SelectItem';
import { Label } from '../label';
import { cn } from '@/shared/utils/tw-merge';

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
      {label && <Label className='text-white'>{label}</Label>}
      <SelectUi onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={cn(
            'bg-white/5 border px-4 py-[22px] border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 hover:bg-white/5 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base',
            label && 'mt-2'
          )}
        >
          <SelectValue placeholder={triggerPlaceholder} />
        </SelectTrigger>
        <SelectContent className="bg-white/5 backdrop-blur-3xl rounded-xl">
          <SelectGroup>
            {selectPlaceholder && (
              <SelectLabel>{selectPlaceholder}</SelectLabel>
            )}

            {values.map(({ label, value }) => (
              <SelectItem className="focus:bg-transparent" onClick={() => console.log("click")} key={nanoid(4)} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUi>
    </div>
  );
};
