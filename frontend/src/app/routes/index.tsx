import { BrowserRouter, Routes, Route } from 'react-router';

import { Home } from '@/pages/home';
import { Analytics } from '@/pages/analytics';
import { MainLayout } from '@/layouts/main';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='categories' element={<></>} />
          <Route path='budget' element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
