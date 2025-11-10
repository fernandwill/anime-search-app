import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SearchPage from '@/pages/SearchPage';
import AnimeDetailPage from '@/pages/AnimeDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: 'anime/:malId', element: <AnimeDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
