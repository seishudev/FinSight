import { cn } from '@/shared/utils/tw-merge';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Label } from '../label';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

interface DatePickerProps {
  open: boolean;
  date: Date;
  onSelect: (date: string) => void;
  setOpen: (val: boolean) => void;
  label?: string;
}

export const DatePicker = ({
  open,
  date,
  setOpen,
  onSelect,
  label
}: DatePickerProps) => {
  const onSelectDate = (date: Date) => {
    onSelect(date.toISOString());
    setOpen(false);
  };

  return (
    <div>
      <Label className='text-white'>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'w-full py-2 text-left bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 hover:bg-white/5 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base block',
              label && 'mt-2'
            )}
          >
            {date.toLocaleDateString()}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Calendar
            required
            mode='single'
            captionLayout='dropdown'
            selected={date}
            onSelect={onSelectDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
