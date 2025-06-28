import { api } from '@/shared/api';
import type { OcrReceiptResponse } from '@/shared/model/Ocr';

export const scanReceiptApi = async (receipt: File) => {
  const formData = new FormData();
  formData.append('file', receipt);

  const { data } = await api.post<OcrReceiptResponse>(
    '/ocr/receipt',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return data;
};
