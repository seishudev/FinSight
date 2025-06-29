import { createRoot } from 'react-dom/client';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import 'react-loading-skeleton/dist/skeleton.css'

import '@/shared/assets/styles/global.scss';
import { AppRouter } from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(<AppRouter />);
