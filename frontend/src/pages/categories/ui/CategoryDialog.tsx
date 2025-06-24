import { DialogFooter, DialogHeader } from '@/shared/ui/dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from '@radix-ui/react-dialog';
import { Button } from '@shared/ui/button';
import { Plus } from 'lucide-react';
import s from './Categories.module.scss';

export const CategoryDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className={s.btn}>
            <Plus size={18} />
            Добавить категорию
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>Новая категория</DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
