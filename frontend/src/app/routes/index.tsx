import { MainLayout } from '@/layouts/main';
import { Login } from '@pages/login';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<></>} />
          <Route path='analytics' element={<></>} />
          <Route path='categories' element={<></>} />
          <Route path='budget' element={<></>} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
