import { createBrowserRouter } from 'react-router-dom';
import { lazy, createElement } from 'react';

const Home = lazy(() => import('../pages/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: createElement(Home),
  },
]);

export default router;
