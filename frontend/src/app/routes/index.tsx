import { MainLayout } from '@/layouts/main';
import { Categories } from '@pages/categories';
import { Home } from '@pages/home';
import { Login } from '@pages/login';
import { Register } from '@pages/register';
import { WelcomeMessage } from '@widgets/welcome-message';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='analytics' element={<></>} />
          <Route path='categories' element={<Categories />} />
          <Route path='budget' element={<></>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='welcome' element={<WelcomeMessage />} />
      </Routes>
    </BrowserRouter>
  );
};
