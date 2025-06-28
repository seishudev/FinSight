import { PageTitle } from '@/entities/page-title';
import { scanReceiptApi } from '@/features/scan-receipt';
import { LoadingIcon } from '@/shared/assets/icons/LoadingIcon';
import { transactionsInteractionsStore } from '@/shared/stores/transactions';
import { Button } from '@/shared/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import s from './Scanner.module.scss';

export const Scanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const data = await scanReceiptApi(file);
      transactionsInteractionsStore.openAddTransactionModal(data);
      toast.success('Чек успешно распознан!');
      navigate('/');
    } catch (error) {
      toast.error('Не удалось распознать чек. Попробуйте еще раз.');
      console.error(error);
    } finally {
      setIsLoading(false);
      if (cameraInputRef.current) cameraInputRef.current.value = '';
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className={s.container}>
      <input
        type='file'
        ref={cameraInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='image/*'
        capture='environment'
        disabled={isLoading}
      />
      <input
        type='file'
        ref={galleryInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='image/*'
        disabled={isLoading}
      />

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
        <Link to='/'>
          <button>
            <X className='text-gray-400' size={24} />
          </button>
        </Link>
      </section>
      <section className={s.main}>
        {isLoading ? (
          <div className='flex flex-col items-center gap-4'>
            <LoadingIcon />
            <p className='text-gray-300'>Распознаем ваш чек...</p>
          </div>
        ) : (
          <>
            <div className='mb-8 animate-bounce'>
              <div className='p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-2xl'>
                <Camera className='text-white' size={48} />
              </div>
            </div>

            <h3>Готовы сканировать чек?</h3>

            <p className='text-gray-400 mb-8 max-w-md'>
              Наведите камеру на чек или загрузите фото из галереи. ИИ
              автоматически распознает товары и добавит транзакции.
            </p>

            <div className={s.actions}>
              <Button onClick={handleCameraClick} className={s.camera}>
                <Camera size={20} />
                Открыть камеру
              </Button>

              <Button onClick={handleGalleryClick} className={s.upload}>
                <Upload size={20} />
                Загрузить из галереи
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
