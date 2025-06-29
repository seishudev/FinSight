import { BrowserRouter, Route, Routes } from 'react-router';

import { MainLayout } from '@/layouts/main';
import { Analytics } from '@pages/analytics';
import { Budget } from '@pages/budget';
import { Categories } from '@pages/categories';
import { Home } from '@pages/home';
import { Login } from '@pages/login';
import { Register } from '@pages/register';
import { Scanner } from '@pages/scanner';
import { TransactionsHistory } from '@/pages/transactions-history';
import { WelcomeMessage } from '@widgets/welcome-message';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='categories' element={<Categories />} />
          <Route path='budget' element={<Budget />} />
          <Route path='transactions' element={<TransactionsHistory />}/>
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='welcome' element={<WelcomeMessage />} />
        <Route path='scanner' element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
};
