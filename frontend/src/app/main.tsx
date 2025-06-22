import { createRoot } from 'react-dom/client';

import '@/shared/assets/styles/global.scss';
import { AppRouter } from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(<AppRouter />);
