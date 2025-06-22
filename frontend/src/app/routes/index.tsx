import { BrowserRouter, Routes, Route } from 'react-router';

import { Button } from '@/shared/ui/button';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Button>Тестовая кнопка</Button>} />
      </Routes>
    </BrowserRouter>
  );
};
