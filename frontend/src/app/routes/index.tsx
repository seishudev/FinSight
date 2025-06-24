import { BrowserRouter, Route, Routes } from 'react-router';

import { MainLayout } from '@/layouts/main';
import { Analytics } from '@/pages/analytics';
import { Home } from '@pages/home';
import { Login } from '@pages/login';
import { Register } from '@pages/register';
import { WelcomeMessage } from '@widgets/welcome-message';

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
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='welcome' element={<WelcomeMessage />} />
      </Routes>
    </BrowserRouter>
  );
};
