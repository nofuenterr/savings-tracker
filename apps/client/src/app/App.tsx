import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

import queryClient from '../lib/queryClient';
import Loading from '../pages/Loading';
import ScrollAreaRoot from '../components/ScrollArea';
import router from './router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollAreaRoot>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ScrollAreaRoot>
    </QueryClientProvider>
  );
}

export default App;
