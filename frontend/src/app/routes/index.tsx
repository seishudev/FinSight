import { MainLayout } from '@/layouts/main';
import { Home } from '@pages/home';
import { Login } from '@pages/login';
import { Register } from '@pages/register';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='analytics' element={<></>} />
          <Route path='categories' element={<></>} />
          <Route path='budget' element={<></>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
