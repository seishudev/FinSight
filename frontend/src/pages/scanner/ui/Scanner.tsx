import { PageTitle } from '@/entities/page-title';
import { Button } from '@/shared/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import s from './Scanner.module.scss';

export const Scanner = () => {
  return (
    <div className={s.container}>
      <section className={s.intro}>
        <PageTitle
          title='Сканер чеков'
          icon={
            <div className={s.icon}>
              <Camera className='text-white' size={20} />
            </div>
          }
          description='Сфотографируйте чек для автоматического добавления'
        />
        <button>
          <X className='text-gray-400' size={24} />
        </button>
      </section>
      <section className={s.main}>
        <div className='mb-8 animate-bounce'>
          <div className='p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-2xl'>
            <Camera className='text-white' size={48} />
          </div>
        </div>

        <h3>Готовы сканировать чек?</h3>

        <p className='text-gray-400 mb-8 max-w-md'>
          Наведите камеру на чек или загрузите фото из галереи. ИИ автоматически
          распознает товары и добавит транзакции.
        </p>

        <div className={s.actions}>
          <Button className={s.camera}>
            <Camera size={20} />
            Открыть камеру
          </Button>

          <Button className={s.upload}>
            <Upload size={20} />
            Загрузить из галереи
          </Button>
        </div>
      </section>
    </div>
  );
};
