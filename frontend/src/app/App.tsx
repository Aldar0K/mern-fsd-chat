import { ChakraProvider } from '@chakra-ui/react';
import { FC, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './styles/main.scss';

import AppRouter from './AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App: FC = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h2>Loading...</h2>}>
          <AppRouter />
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
